const contactForm = document.getElementById("contactForm");
  const toast = document.getElementById("toast");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const fileInput = document.getElementById("file");

    const reader = new FileReader();

    reader.onload = function () {
      const fileData = reader.result;

      Email.send({
        SecureToken: "YOUR_SMTPJS_SECURE_TOKEN",
        To: "your@email.com",
        From: email,
        Subject: `Contact Form Submission from ${name}`,
        Body: `
          <b>Name:</b> ${name}<br/>
          <b>Email:</b> ${email}<br/>
          <b>Phone:</b> ${phone}<br/>
          <b>Message:</b><br/>${message}<br/>
        `,
        Attachments: fileInput.files.length > 0 ? [{
          name: fileInput.files[0].name,
          data: fileData
        }] : []
      }).then(() => {
        showToast();
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      });
    };

    if (fileInput.files.length > 0) {
      reader.readAsDataURL(fileInput.files[0]);
    } else {
      reader.onload();
    }
  });

  function showToast() {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }