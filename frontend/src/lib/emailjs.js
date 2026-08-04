import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_e2lju6c";
const TEMPLATE_ID = "template_ewaifwq";
const PUBLIC_KEY = "5l_GWQlNl38VnJIcK";

export const sendContactEmail = ({ name, email, subject, message }) =>
  emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      name,
      email,
      title: subject || "",
      message,
    },
    PUBLIC_KEY
  );
