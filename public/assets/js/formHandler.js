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


// Doctors form handling

document.addEventListener('DOMContentLoaded', function() {
  let referralForm = document.getElementById('referralForm');
  let sentMessage = document.querySelector('.sent-message');
  let errorMessage = document.querySelector('.error-message');

  if (referralForm) {
    referralForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      // Collect form data
      let formData = new FormData(referralForm);

      // Construct mailto URL with form data
      let mailtoUrl = 'mailto:info@drgebril.com' +
                      '?subject=' + encodeURIComponent('New Referral Request') +
                      '&body=' + encodeURIComponent(
                        'Patient name: ' + formData.get('patient_name') + '\n' +
                        'Date: ' + formData.get('date') + '\n' +
                        'Date Of Birth: ' + formData.get('date_of_birth') + '\n' +
                        'Patient Address: ' + formData.get('patient_address') + '\n' +
                        'Patient Phone: ' + formData.get('patient_phone') + '\n' +
                        'Medical Conditions: ' + formData.get('medical_conditions') + '\n' +
                        'Reason For Referral: ' + formData.get('reason_for_referral') + '\n' +
                        'Special Requests: ' + formData.get('special_requests') + '\n' +
                        'Radiographs: ' + formData.get('radiographs[]') + '\n' +
                        'Referring Dentist: ' + formData.get('referring_dentist') + '\n' +
                        'Dentist Address: ' + formData.get('dentist_address') + '\n' +
                        'Dentist Phone: ' + formData.get('dentist_phone')
                      );

      // Open mailto URL
      window.open(mailtoUrl);

      // Show success message
      sentMessage.style.display = 'block';
      errorMessage.style.display = 'none';

      // Optionally reset form fields after submission
      referralForm.reset();
    });
  }
});
