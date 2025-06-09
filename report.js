document.getElementById("menuToggle").addEventListener("click", function () {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("show");
});


const reportForm = document.getElementById("reportForm");
const confirmationMsg = document.getElementById("confirmationMessage");

// Load saved draft values
window.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("reportFormDraft"));
  if (savedData) {
    const inputs = reportForm.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      if (input.type === "radio") {
        input.checked = input.value === savedData[input.name];
      } else if (input.type !== "file") {
        input.value = savedData[input.name] || "";
      }
    });
  }
});

// Save input as draft
reportForm.addEventListener("input", () => {
  const formData = {};
  const inputs = reportForm.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    if (input.type === "radio") {
      if (input.checked) formData[input.name] = input.value;
    } else if (input.type !== "file") {
      formData[input.name] = input.value;
    }
  });
  localStorage.setItem("reportFormDraft", JSON.stringify(formData));
});

// Submit and permanently store report
reportForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const submittedData = {};
  const inputs = reportForm.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    if (input.type === "radio") {
      if (input.checked) submittedData[input.name] = input.value;
    } else if (input.type !== "file") {
      submittedData[input.name] = input.value;
    }
  });

  // Load existing submissions
  const previousReports = JSON.parse(localStorage.getItem("submittedReports")) || [];

  // Add new report
  previousReports.push(submittedData);

  // Save updated reports array
  localStorage.setItem("submittedReports", JSON.stringify(previousReports));

  // Optionally clear draft
  localStorage.removeItem("reportFormDraft");

  // Reset form
  reportForm.reset();

  // Show confirmation
  confirmationMsg.classList.remove("hidden");

  // Hide after 5 seconds
  setTimeout(() => {
    confirmationMsg.classList.add("hidden");
  }, 5000);
});
