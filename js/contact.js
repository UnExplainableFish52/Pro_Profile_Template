// TEMPLATE NOTE: Ask your AI agent to replace all emailjs_* and brand_* placeholders in this file before going live.
// Simple Contact Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initEmailJS();
    initContactForm();
    initContactEffects();
    initFormValidation();
});

// Initialize EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('emailjs_public_key_here'); 
    }
}

// Contact Form Functionality  
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        showLoadingState();
        
        // Send email using EmailJS
        if (typeof emailjs !== 'undefined') {
            const formData = new FormData(contactForm);
            
            // Email to you (main message)
            const mainTemplateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                message: formData.get('message'),
                to_email: 'brand_primary_email'
            };
            
            // Auto-reply email to sender
            const autoReplyParams = {
                to_name: formData.get('name'),
                email: formData.get('email'),
                user_message: formData.get('message'),
                website_url: "https://brand_domain/",
                current_date: new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })
            };
            
            // Send main email first
            console.log('Attempting to send email with params:', mainTemplateParams);
            emailjs.send('emailjs_service_id_here', 'emailjs_contact_template_id_here', mainTemplateParams)
                .then(function(response) {
                    console.log('Main email sent successfully!', response.status, response.text);
                    contactForm.reset();
                    showSuccessState();
                    showNotification('Message sent successfully! Thank you for contacting me.', 'success');
                    
                    // Try to send auto-reply (optional)
                    if (autoReplyParams.email && autoReplyParams.to_name) {
                        console.log('Attempting to send auto-reply with params:', autoReplyParams);
                        emailjs.send('emailjs_service_id_here', 'emailjs_autoreply_template_id_here', autoReplyParams)
                            .then(function(autoResponse) {
                                console.log('Auto-reply sent successfully!', autoResponse.status, autoResponse.text);
                            })
                            .catch(function(autoError) {
                                console.log('Auto-reply failed (this is optional):', autoError);
                                console.log('Auto-reply error details:', autoError.text);
                            });
                    } else {
                        console.log('Auto-reply not sent: missing email or to_name', autoReplyParams);
                    }
                    
                    // Reset button after delay
                    setTimeout(() => {
                        hideLoadingState();
                    }, 2000);
                })
                .catch(function(error) {
                    console.error('EmailJS Error Details:', error);
                    console.error('Error status:', error.status);
                    console.error('Error text:', error.text);
                    hideLoadingState();
                    showNotification('Failed to send message. Please try again or contact directly.', 'error');
                });
        } else {
            // Fallback - just show success message
            setTimeout(() => {
                contactForm.reset();
                showSuccessState();
                showNotification('EmailJS not loaded. Please set up EmailJS for email functionality.', 'warning');
                
                // Reset button after delay
                setTimeout(() => {
                    hideLoadingState();
                }, 2000);
            }, 1000);
        }
    });
}

// Form Validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (!name) {
        showFieldError('name', 'Please enter your name');
        isValid = false;
    } else if (name.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        showFieldValid('name');
    }
    
    // Validate email
    if (!email) {
        showFieldError('email', 'Please enter your email address');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        showFieldValid('email');
    }
    
    // Validate message
    if (!message) {
        showFieldError('message', 'Please enter your message');
        isValid = false;
    } else if (message.length < 5) {
        showFieldError('message', 'Message must be at least 5 characters');
        isValid = false;
    } else {
        showFieldValid('message');
    }
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    const errorSpan = formGroup.querySelector('.form-error');
    
    formGroup.classList.add('invalid');
    formGroup.classList.remove('valid');
    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

// Show field valid
function showFieldValid(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.add('valid');
    formGroup.classList.remove('invalid');
}

// Clear all errors
function clearErrors() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('invalid', 'valid');
        const errorSpan = group.querySelector('.form-error');
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    });
}

// Loading state management
function showLoadingState() {
    const submitBtn = document.querySelector('.form-submit');
    if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
    }
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.form-submit');
    if (submitBtn) {
        submitBtn.classList.remove('loading', 'success');
        submitBtn.disabled = false;
    }
}

function showSuccessState() {
    const submitBtn = document.querySelector('.form-submit');
    if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
    }
}

// Contact effects and animations
function initContactEffects() {
    // Form input focus effects
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Contact card hover effects  
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Profile image hover effect
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}

// Real-time form validation
function initFormValidation() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleField(this);
        });
        
        input.addEventListener('input', function() {
            // Clear error state on input
            const formGroup = this.closest('.form-group');
            formGroup.classList.remove('invalid');
        });
    });
}

// Validate single field for real-time validation
function validateSingleField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    switch (fieldId) {
        case 'name':
            if (!value) {
                showFieldError('name', 'Please enter your name');
            } else if (value.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters');
            } else {
                showFieldValid('name');
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError('email', 'Please enter your email address');
            } else if (!isValidEmail(value)) {
                showFieldError('email', 'Please enter a valid email address');
            } else {
                showFieldValid('email');
            }
            break;
            
        case 'message':
            if (!value) {
                showFieldError('message', 'Please enter your message');
            } else if (value.length < 5) {
                showFieldError('message', 'Message must be at least 5 characters');
            } else {
                showFieldValid('message');
            }
            break;
    }
}

// Simple notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Style notification
    const bgColor = type === 'success' ? 'var(--brand-color)' : 
                    type === 'error' ? '#ff4757' : 
                    '#3498db';
    
    // Check for dark theme and adjust text color for better contrast
    const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = (type === 'success' && isDarkTheme) ? 'black' : 'white';

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: ${textColor};
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-size: 14px;
        font-weight: 500;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 4000);
}

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
});

// CSS for notifications and form states
const additionalCSS = `
.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.notification-content i {
    font-size: 16px;
    flex-shrink: 0;
}

.form-group.focused label {
    color: var(--brand-color);
}

.form-group input:valid,
.form-group textarea:valid {
    border-color: var(--brand-color);
}

.form-group input:invalid:not(:placeholder-shown),
.form-group textarea:invalid:not(:placeholder-shown) {
    border-color: #ff4757;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
`;

// Add CSS to head
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);


