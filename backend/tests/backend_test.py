"""Backend tests for Smit Patel Portfolio Contact API."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
if not BASE_URL:
    # Fallback: read frontend .env
    with open('/app/frontend/.env') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                BASE_URL = line.split('=', 1)[1].strip().rstrip('/')

API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def created_ids():
    ids = []
    yield ids
    # cleanup
    for mid in ids:
        try:
            requests.delete(f"{API}/contact/messages/{mid}", timeout=10)
        except Exception:
            pass


# ---------- Health ----------
def test_root():
    r = requests.get(f"{API}/", timeout=10)
    assert r.status_code == 200
    assert "running" in r.json().get("message", "").lower()


# ---------- Create ----------
def test_create_contact_valid(created_ids):
    payload = {
        "name": "TEST_User A",
        "email": "test_a@example.com",
        "company": "Acme",
        "subject": "Hello",
        "message": "This is a test message"
    }
    r = requests.post(f"{API}/contact", json=payload, timeout=10)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["status"] == "new"
    assert "created_at" in data
    assert "id" in data
    created_ids.append(data["id"])


def test_create_contact_missing_required():
    r = requests.post(f"{API}/contact", json={"email": "x@y.com"}, timeout=10)
    assert r.status_code == 422


def test_create_contact_invalid_email():
    r = requests.post(f"{API}/contact", json={
        "name": "A", "email": "not-an-email", "message": "hi"
    }, timeout=10)
    assert r.status_code == 422


# ---------- List / Stats ----------
def test_list_sorted_desc(created_ids):
    # create two, second should appear first
    p1 = {"name": "TEST_First", "email": "t1@example.com", "message": "m1"}
    r1 = requests.post(f"{API}/contact", json=p1, timeout=10)
    assert r1.status_code == 200
    created_ids.append(r1.json()["id"])
    time.sleep(1.1)
    p2 = {"name": "TEST_Second", "email": "t2@example.com", "message": "m2"}
    r2 = requests.post(f"{API}/contact", json=p2, timeout=10)
    assert r2.status_code == 200
    created_ids.append(r2.json()["id"])

    r = requests.get(f"{API}/contact/messages", timeout=10)
    assert r.status_code == 200
    msgs = r.json()
    assert isinstance(msgs, list)
    # find first index of each
    ids = [m["id"] for m in msgs]
    assert r2.json()["id"] in ids and r1.json()["id"] in ids
    assert ids.index(r2.json()["id"]) < ids.index(r1.json()["id"])


def test_stats_structure():
    r = requests.get(f"{API}/contact/stats", timeout=10)
    assert r.status_code == 200
    data = r.json()
    for k in ["total", "new", "replied", "archived"]:
        assert k in data
        assert isinstance(data[k], int)


# ---------- Patch ----------
def test_patch_status_valid(created_ids):
    r = requests.post(f"{API}/contact", json={
        "name": "TEST_Patch", "email": "p@example.com", "message": "m"
    }, timeout=10)
    mid = r.json()["id"]
    created_ids.append(mid)
    for status in ["read", "replied", "archived", "new"]:
        pr = requests.patch(f"{API}/contact/messages/{mid}", json={"status": status}, timeout=10)
        assert pr.status_code == 200, pr.text
        assert pr.json()["status"] == status


def test_patch_status_invalid(created_ids):
    r = requests.post(f"{API}/contact", json={
        "name": "TEST_PatchInv", "email": "pi@example.com", "message": "m"
    }, timeout=10)
    mid = r.json()["id"]
    created_ids.append(mid)
    pr = requests.patch(f"{API}/contact/messages/{mid}", json={"status": "spam"}, timeout=10)
    assert pr.status_code == 400


def test_patch_unknown_id():
    pr = requests.patch(f"{API}/contact/messages/nonexistent-id-xyz",
                        json={"status": "read"}, timeout=10)
    assert pr.status_code == 404


# ---------- Delete ----------
def test_delete_valid():
    r = requests.post(f"{API}/contact", json={
        "name": "TEST_Del", "email": "d@example.com", "message": "m"
    }, timeout=10)
    mid = r.json()["id"]
    dr = requests.delete(f"{API}/contact/messages/{mid}", timeout=10)
    assert dr.status_code == 200
    assert dr.json().get("success") is True
    # verify gone
    dr2 = requests.delete(f"{API}/contact/messages/{mid}", timeout=10)
    assert dr2.status_code == 404


def test_delete_unknown():
    dr = requests.delete(f"{API}/contact/messages/nonexistent-id-xyz", timeout=10)
    assert dr.status_code == 404
