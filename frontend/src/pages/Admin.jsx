import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Inbox, Mail, CheckCircle2, Archive, Trash2, RefreshCw, ArrowLeft, Search,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "../components/ui/dialog";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { getMessages, getStats, updateMessageStatus, deleteMessage } from "../lib/api";

const STATUS_STYLES = {
  new: "bg-[#EFF6FF] text-[#2563EB] border-[#2563EB]/20",
  read: "bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]",
  replied: "bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20",
  archived: "bg-[#6B7280]/10 text-[#6B7280] border-[#6B7280]/20",
};
const STATUSES = ["new", "read", "replied", "archived"];

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

export default function Admin() {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, replied: 0, archived: 0 });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [m, s] = await Promise.all([getMessages(), getStats()]);
      setMessages(Array.isArray(m) ? m : []);
      setStats(
        s && typeof s === "object" && !Array.isArray(s)
          ? s
          : { total: 0, new: 0, replied: 0, archived: 0 }
      );
    } catch {
      setMessages([]);
      toast.error("Failed to load enquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = "Admin — Enquiries";
    load();
  }, [load]);

  const changeStatus = async (id, status) => {
    try {
      const updated = await updateMessageStatus(id, status);
      setMessages((prev) =>
        (Array.isArray(prev) ? prev : []).map((m) => (m.id === id ? updated : m))
      );
      setSelected((s) => (s && s.id === id ? updated : s));
      toast.success(`Marked as ${status}`);
      getStats().then(setStats).catch(() => {});
    } catch {
      toast.error("Could not update status.");
    }
  };

  const remove = async (id) => {
    try {
      await deleteMessage(id);
      setMessages((prev) =>
        (Array.isArray(prev) ? prev : []).filter((m) => m.id !== id)
      );
      setSelected((s) => (s && s.id === id ? null : s));
      toast.success("Enquiry deleted.");
      getStats().then(setStats).catch(() => {});
    } catch {
      toast.error("Could not delete enquiry.");
    }
  };

  const openMessage = (m) => {
    setSelected(m);
    if (m.status === "new") changeStatus(m.id, "read");
  };

  const filtered = (Array.isArray(messages) ? messages : []).filter((m) => {
    const matchFilter = filter === "all" || m.status === filter;
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      (m.subject || "").toLowerCase().includes(q) ||
      (m.company || "").toLowerCase().includes(q);
    return matchFilter && matchQuery;
  });

  const s = stats && typeof stats === "object" ? stats : {};
  const statCards = [
    { label: "Total", value: s.total ?? 0, icon: Inbox, color: "text-[#111827]" },
    { label: "New", value: s.new ?? 0, icon: Mail, color: "text-[#2563EB]" },
    { label: "Replied", value: s.replied ?? 0, icon: CheckCircle2, color: "text-[#16A34A]" },
    { label: "Archived", value: s.archived ?? 0, icon: Archive, color: "text-[#6B7280]" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#111827] transition-colors" data-testid="admin-back-link">
              <ArrowLeft size={16} /> Site
            </Link>
            <span className="h-5 w-px bg-[#E5E7EB]" />
            <h1 className="text-base font-semibold tracking-tight text-[#111827]">Enquiries</h1>
          </div>
          <button onClick={load} className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-gray-50 transition-colors" data-testid="admin-refresh">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <div key={s.label} className="rounded-[16px] bg-white border border-[#E5E7EB] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" data-testid={`stat-${s.label.toLowerCase()}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#6B7280]">{s.label}</span>
                <s.icon size={18} className={s.color} />
              </div>
              <p className="mt-3 text-3xl font-black tracking-tight text-[#111827] tabular-nums">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search enquiries..."
              className="w-full rounded-full bg-white border border-[#E5E7EB] pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
              data-testid="admin-search"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["all", ...STATUSES].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-testid={`admin-filter-${f}`}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors border ${
                  filter === f ? "bg-[#111827] text-white border-[#111827]" : "bg-white text-[#6B7280] border-[#E5E7EB] hover:text-[#111827]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[16px] bg-white border border-[#E5E7EB] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          {loading ? (
            <div className="p-16 text-center text-[#6B7280]">Loading enquiries…</div>
          ) : filtered.length === 0 ? (
            <div className="p-16 text-center" data-testid="admin-empty">
              <Inbox size={40} className="mx-auto text-[#D1D5DB]" />
              <p className="mt-4 text-[#6B7280]">No enquiries found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left" data-testid="admin-table">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-xs uppercase tracking-wider text-[#6B7280]">
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold hidden md:table-cell">Company</th>
                    <th className="px-6 py-4 font-semibold hidden lg:table-cell">Subject</th>
                    <th className="px-6 py-4 font-semibold hidden sm:table-cell">Date</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m) => (
                    <tr key={m.id} className="border-b border-[#F3F4F6] last:border-0 hover:bg-[#FAFAFA] cursor-pointer transition-colors" onClick={() => openMessage(m)} data-testid={`admin-row-${m.id}`}>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#111827]">{m.name}</p>
                        <p className="text-sm text-[#6B7280]">{m.email}</p>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell text-sm text-[#374151]">{m.company || "—"}</td>
                      <td className="px-6 py-4 hidden lg:table-cell text-sm text-[#374151] max-w-[200px] truncate">{m.subject || "—"}</td>
                      <td className="px-6 py-4 hidden sm:table-cell text-sm text-[#6B7280] whitespace-nowrap">{fmtDate(m.created_at)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[m.status]}`}>{m.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="inline-flex items-center gap-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#374151] hover:bg-[#F3F4F6] transition-colors" data-testid={`admin-status-trigger-${m.id}`}>Status</button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {STATUSES.map((s) => (
                                <DropdownMenuItem key={s} className="capitalize" onClick={() => changeStatus(m.id, s)} data-testid={`admin-status-${s}-${m.id}`}>{s}</DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <button onClick={() => remove(m.id)} className="rounded-lg p-2 text-[#6B7280] hover:bg-red-50 hover:text-red-600 transition-colors" data-testid={`admin-delete-${m.id}`} aria-label="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg rounded-[16px]" data-testid="admin-message-dialog">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selected.subject || "Enquiry"}</DialogTitle>
                <DialogDescription className="text-[#6B7280]">
                  From {selected.name} · {fmtDate(selected.created_at)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[#374151]">
                  <span><strong className="font-semibold">Email:</strong> {selected.email}</span>
                  {selected.company && <span><strong className="font-semibold">Company:</strong> {selected.company}</span>}
                </div>
                <div className="rounded-[12px] bg-[#FAFAFA] border border-[#E5E7EB] p-4 text-[#111827] whitespace-pre-wrap leading-relaxed">
                  {selected.message}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || "Your enquiry")}`} className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors" data-testid="admin-reply-btn">
                    <Mail size={15} /> Reply by email
                  </a>
                  <button onClick={() => changeStatus(selected.id, "replied")} className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-5 py-2.5 text-sm font-semibold text-[#374151] hover:bg-gray-50 transition-colors">
                    Mark replied
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
