document.addEventListener("DOMContentLoaded", function () {
  // Hero Image Slideshow
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.style.opacity = i === index ? "1" : "0";
      });
  }

  function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  }

  // Show first slide initially
  showSlide(currentSlide);

  // Auto change slide every 5 seconds
  setInterval(nextSlide, 5000);

  // Initialize EmailJS with your User ID
  emailjs.init("TiArJ6t250CaHGYFf");

  // Contact Form Handling (EmailJS Integration)
  document.getElementById("contactForm").addEventListener("submit", function(event) {
      event.preventDefault();

      // Show loading state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      emailjs.send("service_43dhioj", "template_huobhgg", {
          from_name: document.getElementById("first-name").value + " " + document.getElementById("last-name").value,
          enquiry_type: document.getElementById("enquiry-type").value,
          first_name: document.getElementById("first-name").value,
          last_name: document.getElementById("last-name").value,
          phone_number: document.getElementById("phone").value,
          from_email: document.getElementById("email").value,
          company_name: document.getElementById("company-name") ? document.getElementById("company-name").value : "N/A",
          message: document.getElementById("message").value      
      })
      .then(() => {
          document.getElementById("form-status").innerText = "Message sent successfully!";
          document.getElementById("contactForm").reset();
      })
      .catch((error) => {
          document.getElementById("form-status").innerText = "Failed to send message: " + error;
      })
      .finally(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
      });
  });

  // Toggle Company Name Field on Business Hire Selection
  const selectButtons = document.querySelectorAll(".select-btn");
  const enquiryInput = document.getElementById("enquiry-type");
  const companyField = document.getElementById("company-field");

  selectButtons.forEach(button => {
      button.addEventListener("click", () => {
          // Remove active class from all buttons
          selectButtons.forEach(btn => btn.classList.remove("active"));

          // Add active class to clicked button
          button.classList.add("active");

          // Update hidden input value
          const selectedValue = button.getAttribute("data-value");
          enquiryInput.value = selectedValue;

          // Show/hide company field based on selection
          if (selectedValue === "Business Hire") {
              companyField.style.display = "block";
          } else {
              companyField.style.display = "none";
          }
      });
  });
});
