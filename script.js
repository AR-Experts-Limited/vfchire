document.addEventListener("DOMContentLoaded", function () {
  
  // --- 1. EMAILJS CONFIGURATION ---
  // IMPORTANT: Replace these with your actual EmailJS credentials
  const EMAILJS_CONFIG = {
    publicKey: "cqABHeRy0jcFIXukZ",      // Replace with your Public Key
    serviceId: "service_90s5vyh",    // Replace with your Service ID
    templateId: "template_nd4utq9", // Replace with your Template ID
  };
  emailjs.init(EMAILJS_CONFIG.publicKey);


  // --- 2. HEADER SCROLL EFFECT ---
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }


  // --- 3. MOBILE MENU TOGGLE ---
  const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuIcon && mobileMenu) {
    mobileMenuIcon.addEventListener('click', function(event) {
      event.stopPropagation();
      mobileMenu.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!mobileMenu.contains(event.target) && !mobileMenuIcon.contains(event.target)) {
        mobileMenu.classList.remove('active');
      }
    });
  }


  // --- 4. HERO IMAGE SLIDESHOW ---
  const slideContainer = document.querySelector(".slide-container");
  if (slideContainer) {
    const slides = slideContainer.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    showSlide(currentSlide); // Show first slide initially
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }
  

  // --- 5. ENQUIRY FORM HANDLING ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const enquiryInput = document.getElementById("enquiry-type");
    const companyField = document.getElementById("company-field");
    const selectButtons = document.querySelectorAll(".select-btn");

    // Logic for Business/Personal hire buttons
    selectButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            
            const selectedValue = button.getAttribute("data-value");
            enquiryInput.value = selectedValue;

            companyField.style.display = (selectedValue === "Business Hire") ? "block" : "none";
        });
    });
    
    // Form submission logic
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const submitButton = this.querySelector('button[type="submit"]');
        const formStatus = document.getElementById("form-status");
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        formStatus.textContent = '';

        const templateParams = {
            enquiry_type: enquiryInput.value,
            company_name: document.getElementById("company-name") ? document.getElementById("company-name").value : "N/A",
            first_name: document.getElementById("first-name").value,
            last_name: document.getElementById("last-name").value,
            phone_number: document.getElementById("phone").value,
            from_email: document.getElementById("email").value,
            message: document.getElementById("message").value      
        };

        emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams)
        .then(() => {
            formStatus.innerText = "Message sent successfully!";
            formStatus.style.color = "#28a745";
            contactForm.reset();
            // Reset selection buttons
            selectButtons.forEach(btn => btn.classList.remove("active"));
            companyField.style.display = "none";
        })
        .catch((error) => {
            formStatus.innerText = "Failed to send message. Please try again.";
            formStatus.style.color = "#dc3545";
            console.error("EmailJS Error:", error);
        })
        .finally(() => {
            submitButton.textContent = 'Submit';
            submitButton.disabled = false;
        });
    });
  }


  // --- 6. LEAFLET MAP INITIALIZATION ---
  const mapElement = document.getElementById('map');
  if (mapElement) {
    const map = L.map('map').setView([53.4808, -2.2426], 13); // Manchester coordinates
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Office Location Marker
    const officeLocation = [53.48185, -2.32659];
    L.marker(officeLocation).addTo(map)
        .bindPopup('<b>VFC Hire Office</b><br>Centenary House, Salford')
        .openPopup();
  }


  // --- 7. COOKIE CONSENT BANNER ---
  const cookieBanner = document.getElementById("cookieConsent");
  if (cookieBanner) {
    const acceptButton = cookieBanner.querySelector("button");

    function acceptCookies() {
      cookieBanner.style.display = "none";
      localStorage.setItem("cookiesAccepted", "true");
    }
    
    acceptButton.addEventListener("click", acceptCookies);

    if (!localStorage.getItem("cookiesAccepted")) {
      cookieBanner.style.display = "flex";
    } else {
      cookieBanner.style.display = "none";
    }
  }

});