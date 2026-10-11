// IMPORTANT: Replace this with the shop's WhatsApp number.
// Use country code, digits only. Example: 919876543210
const SHOP_WHATSAPP = "91XXXXXXXXXX";

const form = document.getElementById("booking-form");
const dateInput = document.getElementById("date");
document.getElementById("year").textContent = new Date().getFullYear();

const now = new Date();
const localToday = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0")
].join("-");
dateInput.min = localToday;

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("service").value = link.dataset.service;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const name = document.getElementById("customer-name").value.trim();
  const phone = document.getElementById("customer-phone").value.trim();
  const service = document.getElementById("service").value;
  const date = dateInput.value;
  const time = document.getElementById("time").value;

  if (!/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }
  if (date < localToday) {
    alert("Please select today or a future date.");
    return;
  }
  if (!/^[0-9]{10,15}$/.test(SHOP_WHATSAPP)) {
    alert("Shop WhatsApp number is not configured yet. Please contact the shop directly.");
    return;
  }

  const message =
    "Hello Royal Cuts! I would like to request an appointment.\\n\\n" +
    "Name: " + name + "\\n" +
    "Customer mobile: " + phone + "\\n" +
    "Service: " + service + "\\n" +
    "Preferred date: " + date + "\\n" +
    "Preferred time: " + time + "\\n\\n" +
    "Please confirm availability. Thank you!";

  const url = "https://wa.me/" + SHOP_WHATSAPP + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener,noreferrer");
});
