// WhatsApp phone number (replace with your actual WhatsApp business number)
const WHATSAPP_NUMBER = '1234567890'; // Replace with your WhatsApp number

// DOM Elements
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const quickChatBtn = document.getElementById('quickChatBtn');
const customChatBtn = document.getElementById('customChatBtn');
const whatsappMessage = document.getElementById('whatsappMessage');
const floatingWhatsApp = document.getElementById('floatingWhatsApp');

// Form submission handler
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  try {
    // Simulate form submission (replace with your actual endpoint)
    await simulateFormSubmission(data);
    
    // Show success message
    showFormStatus('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
  } catch (error) {
    // Show error message
    showFormStatus('error', 'Sorry, there was an error sending your message. Please try again or contact us via WhatsApp.');
  } finally {
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// Quick WhatsApp chat
quickChatBtn.addEventListener('click', () => {
  const message = "Hi! I'd like to get in touch with you.";
  openWhatsAppChat(message);
});

// Custom WhatsApp message
customChatBtn.addEventListener('click', () => {
  const message = whatsappMessage.value.trim();
  if (message) {
    openWhatsAppChat(message);
    whatsappMessage.value = '';
  } else {
    alert('Please enter a message before sending.');
  }
});

// Floating WhatsApp button
floatingWhatsApp.addEventListener('click', () => {
  const message = "Hello! I'm interested in your services.";
  openWhatsAppChat(message);
});

// Allow Enter key to send custom WhatsApp message
whatsappMessage.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    customChatBtn.click();
  }
});

// Helper Functions
function openWhatsAppChat(message) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

function showFormStatus(type, message) {
  formStatus.className = `form-status ${type}`;
  formStatus.textContent = message;
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    formStatus.style.display = 'none';
  }, 5000);
}

// Simulate form submission (replace with your actual API call)
async function simulateFormSubmission(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success (90% of the time)
      if (Math.random() > 0.1) {
        console.log('Form submitted:', data);
        resolve();
      } else {
        reject(new Error('Submission failed'));
      }
    }, 2000);
  });
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add form validation enhancements
const inputs = document.querySelectorAll('input, textarea, select');
inputs.forEach(input => {
  input.addEventListener('blur', validateField);
  input.addEventListener('input', clearFieldError);
});

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  // Remove existing error styling
  field.classList.remove('error');
  
  // Basic validation
  if (field.hasAttribute('required') && !value) {
    showFieldError(field, 'This field is required');
    return false;
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, 'Please enter a valid email address');
      return false;
    }
  }
  
  // Phone validation (basic)
  if (field.type === 'tel' && value) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
      showFieldError(field, 'Please enter a valid phone number');
      return false;
    }
  }
  
  return true;
}

function showFieldError(field, message) {
  field.classList.add('error');
  
  // Remove existing error message
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

function clearFieldError(e) {
  const field = e.target;
  field.classList.remove('error');
  const errorDiv = field.parentNode.querySelector('.field-error');
  if (errorDiv) {
    errorDiv.remove();
  }
}

// Add CSS for field validation
const style = document.createElement('style');
style.textContent = `
  .form-group input.error,
  .form-group textarea.error,
  .form-group select.error {
    border-color: #e53e3e;
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
  }
  
  .field-error {
    color: #e53e3e;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;
document.head.appendChild(style);

console.log('Contact & Chat website loaded successfully!');
console.log('Remember to update the WHATSAPP_NUMBER variable with your actual WhatsApp business number.');