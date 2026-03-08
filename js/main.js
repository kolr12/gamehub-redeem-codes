/**
 * GameHub - Main JavaScript
 * Interactive features for gaming website
 */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initCodeCopy();
    initFilter();
    initSearch();
    initMobileMenu();
    initSmoothScroll();
    initNewsletter();
});

/**
 * Particle Background Animation
 */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;
    const colors = ['#a855f7', '#06b6d4', '#f43f5e', '#10b981'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        background: ${color};
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        particle.remove();
        createParticle(container);
    }, (delay + duration) * 1000);
}

/**
 * Navbar Scroll Effect
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.padding = '12px 0';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.padding = '20px 0';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Copy Code Functionality
 */
function initCodeCopy() {
    const copyButtons = document.querySelectorAll('.copy-code-btn');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const code = btn.dataset.code;
            
            try {
                await navigator.clipboard.writeText(code);
                showToast('Code copied to clipboard!');
                
                // Visual feedback
                const originalHTML = btn.innerHTML;
                btn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    COPIED!
                `;
                btn.style.background = 'rgba(34, 197, 94, 0.2)';
                btn.style.borderColor = '#22c55e';
                btn.style.color = '#22c55e';
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2000);
                
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = code;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Code copied to clipboard!');
            }
        });
    });
    
    // Hero floating card copy
    const heroCopyBtn = document.querySelector('.floating-card .copy-btn');
    if (heroCopyBtn) {
        heroCopyBtn.addEventListener('click', () => {
            const code = document.querySelector('.code-text').textContent;
            navigator.clipboard.writeText(code);
            showToast('Code copied!');
        });
    }
}

/**
 * Show Toast Notification
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Filter Codes by Game
 */
function initFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const codeCards = document.querySelectorAll('.code-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter cards with animation
            codeCards.forEach(card => {
                const game = card.dataset.game;
                
                if (filter === 'all' || game === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Search Functionality
 */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            // Search in code cards
            const codeCards = document.querySelectorAll('.code-card');
            codeCards.forEach(card => {
                const gameName = card.querySelector('h3').textContent.toLowerCase();
                const code = card.querySelector('code').textContent.toLowerCase();
                const reward = card.querySelector('.reward').textContent.toLowerCase();
                
                if (gameName.includes(query) || code.includes(query) || reward.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Search in game cards
            const gameCards = document.querySelectorAll('.game-card');
            gameCards.forEach(card => {
                const gameName = card.querySelector('h3').textContent.toLowerCase();
                
                if (gameName.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Search in tips
            const tipCards = document.querySelectorAll('.tip-card');
            tipCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(query) || content.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        });
    }
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                if (link.classList.contains('nav-link')) {
                    link.classList.add('active');
                }
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * Newsletter Form
 */
function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            const btn = form.querySelector('button');
            
            // Simulate submission
            btn.textContent = 'Subscribing...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = 'Subscribed!';
                btn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                showToast('Successfully subscribed to newsletter!');
                form.reset();
                
                setTimeout(() => {
                    btn.textContent = 'Subscribe';
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
}

/**
 * Countdown Timer for Expiry
 */
function initCountdown() {
    const expiryElements = document.querySelectorAll('.expiry');
    
    expiryElements.forEach(el => {
        // Parse expiry text and create countdown
        const text = el.textContent;
        const daysMatch = text.match(/(\d+)\s*day/);
        
        if (daysMatch) {
            const days = parseInt(daysMatch[1]);
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + days);
            
            // Update every hour
            setInterval(() => {
                const now = new Date();
                const diff = expiryDate - now;
                
                if (diff <= 0) {
                    el.textContent = '⏰ EXPIRED';
                    el.style.color = '#f43f5e';
                } else {
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    
                    if (hours < 24) {
                        el.textContent = `⏰ ${hours}h ${mins}m left`;
                        el.style.color = '#f43f5e';
                    }
                }
            }, 60000);
        }
    });
}

// Initialize countdown on load
initCountdown();

/**
 * Card Hover Effects Enhancement
 */
document.querySelectorAll('.code-card, .game-card, .tip-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/**
 * Glitch Effect Randomization
 */
setInterval(() => {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(el => {
        el.style.animation = 'none';
        setTimeout(() => {
            el.style.animation = '';
        }, 10);
    });
}, 5000);

/**
 * Parallax Effect for Hero
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual && scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Performance: Passive scroll listeners
window.addEventListener('scroll', () => {}, { passive: true });