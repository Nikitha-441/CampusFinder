document.getElementById("menuToggle").addEventListener("click", function () {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show");
});

const contactForm = document.getElementById("contactForm");

// Load draft from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedDraft = JSON.parse(localStorage.getItem("contactFormDraft"));
  if (savedDraft) {
    contactForm.name.value = savedDraft.name || "";
    contactForm.email.value = savedDraft.email || "";
    contactForm.message.value = savedDraft.message || "";
  }
});

// Save draft on input
contactForm.addEventListener("input", () => {
  const draft = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    message: contactForm.message.value,
  };
  localStorage.setItem("contactFormDraft", JSON.stringify(draft));
});

// Submit form and store message
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const submittedMessage = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    message: contactForm.message.value,
    timestamp: new Date().toISOString(),
  };

  // Load existing messages or create new array
  const allMessages = JSON.parse(localStorage.getItem("submittedContacts")) || [];

  // Add new message
  allMessages.push(submittedMessage);

  // Save all messages
  localStorage.setItem("submittedContacts", JSON.stringify(allMessages));

  // Clear draft
  localStorage.removeItem("contactFormDraft");

  // Reset form
  contactForm.reset();

  // Optional: Show success alert (or add a message div)
  alert("✅ Your message was sent successfully!");
});
