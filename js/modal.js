// Modal functionality
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');
const toast = document.getElementById('toast');

openModalBtn.addEventListener('click', () => {
  modalOverlay.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
});

// Close if clicked outside the modal
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('active');
  }
});

// File input display
const fileInput = document.getElementById('attachment');
const fileName = document.getElementById('fileName');

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    fileName.textContent = fileInput.files[0].name;
  } else {
    fileName.textContent = 'No file chosen';
  }
});

// Toast notification function
function showToast(message) {
  // Set message if provided
  if (message) {
    document.querySelector('.toast-message').textContent = message;
  }
  
  // Show toast
  toast.classList.add('show');
  
  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Form submission with SMTP.js
const contactForm = document.getElementById('contactForm');
const successAlert = document.getElementById('successAlert');
const errorAlert = document.getElementById('errorAlert');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const attachment = document.getElementById('attachment').files[0];
  
  // Hide previous alerts
  successAlert.style.display = 'none';
  errorAlert.style.display = 'none';
  
  // Prepare email content
  let emailBody = `
    Name: ${name}<br>
    Phone: ${phone}<br>
    Email: ${email}<br>
    Message: ${message}<br>
  `;
  
  // Function to send email using SMTP.js
  const sendEmail = () => {
    // Replace these with your actual SMTP credentials
    const smtpUsername = "your-smtp-username"; // Replace with your SMTP username
    const smtpPassword = "your-smtp-password"; // Replace with your SMTP password
    const smtpHost = "smtp.example.com";       // Replace with your SMTP host
    const toEmail = "recipient@example.com";   // Replace with recipient email
    
    try {
      // Configure SMTP
      Email.send({
        Host: smtpHost,
        Username: smtpUsername,
        Password: smtpPassword,
        To: toEmail,
        From: smtpUsername,
        Subject: "New Contact Form Submission",
        Body: emailBody,
        Attachments: attachment ? [{
          name: attachment.name,
          data: fileDataURL
        }] : []
      }).then(message => {
        if (message === "OK") {
          // Close modal
          modalOverlay.classList.remove('active');
          
          // Show toast notification
          showToast("Message sent successfully!");
          
          // Reset form
          contactForm.reset();
          fileName.textContent = 'No file chosen';
          
          // Redirect to home page after 1.5 seconds
          setTimeout(() => {
            window.location.href = "/"; // Change this to your home page URL if different
          }, 1500);
        } else {
          // Show error message
          errorAlert.style.display = 'block';
          console.error("Email sending failed:", message);
        }
      });
    } catch (error) {
      errorAlert.style.display = 'block';
      console.error("Email sending error:", error);
    }
  };
  
  // Handle file attachment if present
  if (attachment) {
    const reader = new FileReader();
    let fileDataURL;
    
    reader.onload = function(e) {
      fileDataURL = e.target.result;
      sendEmail();
    };
    
    reader.readAsDataURL(attachment);
  } else {
    sendEmail();
  }
});