document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuIcon && mobileMenu) {
    mobileMenuIcon.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.mobile-menu') && 
        !event.target.closest('.mobile-menu-icon') && 
        mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    }
  });
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
  emailjs.init("cqABHeRy0jcFIXukZ");

  // Contact Form Handling (EmailJS Integration)
  document.getElementById("contactForm").addEventListener("submit", function(event) {
      event.preventDefault();

      // Show loading state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      emailjs.send("service_90s5vyh", "template_nd4utq9", {
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
