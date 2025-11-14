// Appointment form handling
document.addEventListener('DOMContentLoaded', function() {
    let appointmentForm = document.getElementById('appointmentForm');
    let appointmentSentMessage = document.querySelector('.appointment-sent-message');
    let appointmentErrorMessage = document.querySelector('.appointment-error-message');
  
    appointmentForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission
  
      // Collect form data
      let formData = new FormData(appointmentForm);
  
      // Construct mailto URL with form data (example)
      let mailtoUrl = 'mailto:info@drgebril.com' +
                      '?subject=' + encodeURIComponent('New Appointment Request') +
                      '&body=' + encodeURIComponent(
                        'Name: ' + formData.get('name') + '\n' +
                        'Email: ' + formData.get('email') + '\n' +
                        'Phone: ' + formData.get('phone') + '\n' +
                        'Reason: ' + formData.get('reason') + '\n' +
                        'Best Time: ' + formData.get('bestTime') + '\n' +
                        'Message: ' + formData.get('message')
                      );
  
      // Open mailto URL
      window.open(mailtoUrl);
  
      // Show success message
      appointmentSentMessage.style.display = 'block';
      appointmentErrorMessage.style.display = 'none';
  
      // Optionally reset form fields after submission
      appointmentForm.reset();
    });
});


// Referral form handling
document.addEventListener("DOMContentLoaded", function () {
  const referralForm = document.getElementById("referralForm");
  if (!referralForm) return; // safety check

  referralForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // stop default HTML form submit

    const formData = new FormData(referralForm);
    const data = Object.fromEntries(formData.entries());

    // Collect checkbox values correctly
    data.radiographs = formData.getAll("radiographs[]");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Referral submitted successfully!");
        referralForm.reset();
      } else {
        alert("Error: " + result.message);
        console.error("Server Error:", result);
      }

    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Unexpected error occurred.");
    }
  });
});
