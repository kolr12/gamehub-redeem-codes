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
    initRobloxFilter();
    initRobloxCopy();
});

/**
 * Roblox Filter
 */
function initRobloxFilter() {
    const filterButtons = document.querySelectorAll('.roblox-filter .filter-btn');
    const robloxCards = document.querySelectorAll('.roblox-code-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            robloxCards.forEach(card => {
                const game = card.dataset.robloxGame;
                
                if (filter === 'roblox-all' || game === filter) {
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
 * Roblox Code Copy
 */
function initRobloxCopy() {
    const copyButtons = document.querySelectorAll('.roblox-copy');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const code = btn.dataset.code;
            
            try {
                await navigator.clipboard.writeText(code);
                showToast('Roblox code copied!');
                
                const originalText = btn.textContent;
                btn.textContent = '✓';
                btn.style.background = '#22c55e';
                btn.style.borderColor = '#22c55e';
                btn.style.color = 'white';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                }, 2000);
                
            } catch (err) {
                const textArea = document.createElement('textarea');
                textArea.value = code;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Code copied!');
            }
        });
    });
}

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

/**
 * Games Category Filter
 */
function initGamesCategoryFilter() {
    const tabs = document.querySelectorAll('.category-tab');
    const gameCards = document.querySelectorAll('.game-card[data-category]');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            
            gameCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Games Modal
 */
function initGamesModal() {
    const viewAllBtn = document.getElementById('viewAllGames');
    const modal = document.getElementById('gamesModal');
    const closeBtn = document.getElementById('closeGamesModal');
    const gamesList = document.getElementById('allGamesList');
    const searchInput = document.getElementById('gamesSearchInput');
    
    // Sample 100 games data
    const allGames = [
        { name: "Genshin Impact", category: "Mobile", codes: 3, icon: "⚔️", color: "#4B69D9" },
        { name: "Mobile Legends", category: "Mobile", codes: 3, icon: "⚔️", color: "#FF6B6B" },
        { name: "PUBG Mobile", category: "Mobile", codes: 3, icon: "🎯", color: "#F7B731" },
        { name: "Free Fire", category: "Mobile", codes: 3, icon: "🔥", color: "#48DBFB" },
        { name: "COD Mobile", category: "Mobile", codes: 2, icon: "🔫", color: "#FF9F43" },
        { name: "Clash of Clans", category: "Mobile", codes: 2, icon: "🏰", color: "#FF6B35" },
        { name: "Clash Royale", category: "Mobile", codes: 1, icon: "👑", color: "#FF4757" },
        { name: "Brawl Stars", category: "Mobile", codes: 1, icon: "⭐", color: "#FFA502" },
        { name: "Honkai Star Rail", category: "Mobile", codes: 2, icon: "🚂", color: "#7B68EE" },
        { name: "Tower of Fantasy", category: "Mobile", codes: 1, icon: "🏗️", color: "#00D2D3" },
        { name: "eFootball 2024", category: "Mobile", codes: 1, icon: "⚽", color: "#1E90FF" },
        { name: "EA FC Mobile", category: "Mobile", codes: 1, icon: "⚽", color: "#2ECC71" },
        { name: "NBA 2K Mobile", category: "Mobile", codes: 1, icon: "🏀", color: "#E74C3C" },
        { name: "Asphalt 9", category: "Mobile", codes: 1, icon: "🏎️", color: "#E74C3C" },
        { name: "Ragnarok X", category: "Mobile", codes: 1, icon: "⚔️", color: "#9B59B6" },
        { name: "Perfect World", category: "Mobile", codes: 1, icon: "🌏", color: "#3498DB" },
        { name: "LifeAfter", category: "Mobile", codes: 1, icon: "🧟", color: "#2C3E50" },
        { name: "Lords Mobile", category: "Mobile", codes: 1, icon: "👑", color: "#F39C12" },
        { name: "Rise of Kingdoms", category: "Mobile", codes: 1, icon: "🏛️", color: "#D4AC0D" },
        { name: "State of Survival", category: "Mobile", codes: 1, icon: "🧟", color: "#27AE60" },
        { name: "Puzzles & Survival", category: "Mobile", codes: 1, icon: "🧩", color: "#8E44AD" },
        { name: "Age of Origins", category: "Mobile", codes: 1, icon: "🏛️", color: "#C0392B" },
        { name: "Evony", category: "Mobile", codes: 1, icon: "👑", color: "#F1C40F" },
        { name: "Top War", category: "Mobile", codes: 1, icon: "⚔️", color: "#E67E22" },
        { name: "Last Shelter", category: "Mobile", codes: 1, icon: "🏚️", color: "#7F8C8D" },
        { name: "Mafia City", category: "Mobile", codes: 1, icon: "🕴️", color: "#2C3E50" },
        { name: "Coin Master", category: "Mobile", codes: 1, icon: "🪙", color: "#F39C12" },
        { name: "Candy Crush", category: "Mobile", codes: 1, icon: "🍬", color: "#E91E63" },
        { name: "Pokémon GO", category: "Mobile", codes: 1, icon: "⚡", color: "#FFEB3B" },
        { name: "RAID Shadow Legends", category: "Mobile", codes: 1, icon: "⚔️", color: "#8B0000" },
        { name: "Summoners War", category: "Mobile", codes: 1, icon: "🔮", color: "#9B59B6" },
        { name: "Epic Seven", category: "Mobile", codes: 1, icon: "⭐", color: "#3498DB" },
        { name: "AFK Arena", category: "Mobile", codes: 1, icon: "🛡️", color: "#E74C3C" },
        { name: "Idle Heroes", category: "Mobile", codes: 1, icon: "⚔️", color: "#F39C12" },
        { name: "Dislyte", category: "Mobile", codes: 1, icon: "🎵", color: "#9B59B6" },
        { name: "Saint Seiya", category: "Mobile", codes: 1, icon: "⭐", color: "#FFD700" },
        { name: "Dragon Ball Legends", category: "Mobile", codes: 1, icon: "🐉", color: "#FF6B35" },
        { name: "Naruto Mobile", category: "Mobile", codes: 1, icon: "🍥", color: "#FF8C00" },
        { name: "One Piece Bounty", category: "Mobile", codes: 1, icon: "☠️", color: "#FFD700" },
        { name: "Dragon Raja", category: "Mobile", codes: 1, icon: "🐲", color: "#E74C3C" },
        { name: "Sky: Children", category: "Mobile", codes: 1, icon: "🕯️", color: "#87CEEB" },
        { name: "Among Us", category: "Mobile", codes: 1, icon: "🚀", color: "#FF0000" },
        { name: "Fall Guys", category: "Mobile", codes: 1, icon: "🫘", color: "#FF69B4" },
        { name: "Blox Fruits", category: "Roblox", codes: 19, icon: "🍎", color: "#FF4757" },
        { name: "Shindo Life", category: "Roblox", codes: 4, icon: "🥷", color: "#FF6B35" },
        { name: "Adopt Me!", category: "Roblox", codes: 2, icon: "🐾", color: "#FF6B9D" },
        { name: "Anime Adventures", category: "Roblox", codes: 1, icon: "⚔️", color: "#9B59B6" },
        { name: "King Legacy", category: "Roblox", codes: 2, icon: "👑", color: "#FFD700" },
        { name: "Pet Simulator X", category: "Roblox", codes: 1, icon: "🐾", color: "#00D2D3" },
        { name: "Murder Mystery 2", category: "Roblox", codes: 0, icon: "🔪", color: "#8B0000" },
        { name: "Jailbreak", category: "Roblox", codes: 1, icon: "🚔", color: "#4169E1" },
        { name: "MeepCity", category: "Roblox", codes: 0, icon: "🏠", color: "#FF69B4" },
        { name: "Royale High", category: "Roblox", codes: 0, icon: "👗", color: "#FF1493" },
        { name: "Welcome to Bloxburg", category: "Roblox", codes: 0, icon: "🏡", color: "#87CEEB" },
        { name: "Tower of Hell", category: "Roblox", codes: 0, icon: "🏗️", color: "#FFA500" },
        { name: "Brookhaven", category: "Roblox", codes: 0, icon: "🏘️", color: "#32CD32" },
        { name: "Project Slayers", category: "Roblox", codes: 1, icon: "⚔️", color: "#DC143C" },
        { name: "Grand Piece Online", category: "Roblox", codes: 1, icon: "⚓", color: "#1E90FF" },
        { name: "Anime Fighting Sim", category: "Roblox", codes: 1, icon: "👊", color: "#FF6347" },
        { name: "Anime Dimensions", category: "Roblox", codes: 1, icon: "🌌", color: "#9370DB" },
        { name: "All Star Tower Defense", category: "Roblox", codes: 1, icon: "⭐", color: "#FFD700" },
        { name: "Bubble Gum Sim", category: "Roblox", codes: 1, icon: "🫧", color: "#FF69B4" },
        { name: "Mining Simulator 2", category: "Roblox", codes: 1, icon: "⛏️", color: "#8B4513" },
        { name: "Tower Defense Sim", category: "Roblox", codes: 1, icon: "🗼", color: "#228B22" },
        { name: "BedWars", category: "Roblox", codes: 1, icon: "🛏️", color: "#FF4500" },
        { name: "Arsenal", category: "Roblox", codes: 1, icon: "🔫", color: "#DC143C" },
        { name: "Phantom Forces", category: "Roblox", codes: 1, icon: "🎯", color: "#2F4F4F" },
        { name: "Livetopia", category: "Roblox", codes: 1, icon: "🏙️", color: "#00CED1" },
        { name: "Club Roblox", category: "Roblox", codes: 1, icon: "🎪", color: "#FF1493" },
        { name: "Work at Pizza Place", category: "Roblox", codes: 1, icon: "🍕", color: "#FFA500" },
        { name: "Natural Disaster", category: "Roblox", codes: 0, icon: "🌪️", color: "#4682B4" },
        { name: "Epic Minigames", category: "Roblox", codes: 1, icon: "🎮", color: "#9932CC" },
        { name: "Speed Run 4", category: "Roblox", codes: 0, icon: "🏃", color: "#00FF00" },
        { name: "Theme Park Tycoon", category: "Roblox", codes: 1, icon: "🎢", color: "#FF69B4" },
        { name: "Ninja Legends", category: "Roblox", codes: 1, icon: "🥷", color: "#800080" },
        { name: "Saber Simulator", category: "Roblox", codes: 1, icon: "⚔️", color: "#C0C0C0" },
        { name: "Magnet Simulator", category: "Roblox", codes: 1, icon: "🧲", color: "#FF0000" },
        { name: "Ice Cream Simulator", category: "Roblox", codes: 1, icon: "🍦", color: "#FFB6C1" },
        { name: "Zombie Attack", category: "Roblox", codes: 1, icon: "🧟", color: "#556B2F" },
        { name: "Fortnite", category: "PC", codes: 1, icon: "🔫", color: "#9B59B6" },
        { name: "Valorant", category: "PC", codes: 1, icon: "🎯", color: "#FF4655" },
        { name: "League of Legends", category: "PC", codes: 1, icon: "⚔️", color: "#C89B3C" },
        { name: "Counter-Strike 2", category: "PC", codes: 1, icon: "🔫", color: "#FFA500" },
        { name: "Dota 2", category: "PC", codes: 1, icon: "🛡️", color: "#B71C1C" },
        { name: "Apex Legends", category: "PC", codes: 1, icon: "🏆", color: "#DA291C" },
        { name: "Overwatch 2", category: "PC", codes: 1, icon: "⚡", color: "#F99E1A" },
        { name: "Rocket League", category: "PC", codes: 1, icon: "🚗", color: "#0070D1" },
        { name: "Minecraft", category: "PC", codes: 1, icon: "⛏️", color: "#5D8C3A" },
        { name: "Terraria", category: "PC", codes: 1, icon: "🌳", color: "#8B4513" },
        { name: "Stardew Valley", category: "PC", codes: 1, icon: "🌾", color: "#FF6B9D" },
        { name: "Warframe", category: "PC", codes: 1, icon: "🚀", color: "#00BFFF" },
        { name: "Destiny 2", category: "PC", codes: 1, icon: "🌌", color: "#F5F5F5" },
        { name: "GTA V", category: "PC", codes: 1, icon: "🚗", color: "#2E8B57" },
        { name: "Sea of Thieves", category: "PC", codes: 1, icon: "🏴‍☠️", color: "#006994" },
        { name: "World of Warcraft", category: "PC", codes: 1, icon: "⚔️", color: "#C79C6E" },
        { name: "Elden Ring", category: "PC", codes: 1, icon: "💍", color: "#FFD700" },
        { name: "Slither.io", category: "Web", codes: 1, icon: "🐍", color: "#8BC34A" },
        { name: "Agar.io", category: "Web", codes: 1, icon: "🔵", color: "#2196F3" },
        { name: "Diep.io", category: "Web", codes: 1, icon: "🔫", color: "#FF5722" },
        { name: "Krunker.io", category: "Web", codes: 1, icon: "🎯", color: "#9C27B0" },
        { name: "Surviv.io", category: "Web", codes: 1, icon: "🏆", color: "#4CAF50" },
        { name: "ZombsRoyale.io", category: "Web", codes: 1, icon: "🧟", color: "#795548" },
        { name: "MooMoo.io", category: "Web", codes: 1, icon: "🐄", color: "#8D6E63" },
        { name: "Starve.io", category: "Web", codes: 1, icon: "❄️", color: "#00BCD4" },
        { name: "Wings.io", category: "Web", codes: 1, icon: "✈️", color: "#03A9F4" },
        { name: "Limax.io", category: "Web", codes: 1, icon: "🐌", color: "#E91E63" }
    ];
    
    function renderGames(gamesToRender) {
        gamesList.innerHTML = gamesToRender.map(game => `
            <div class="games-list-item">
                <div class="games-list-icon" style="background: ${game.color}20; color: ${game.color}">
                    ${game.icon}
                </div>
                <div class="games-list-info">
                    <h4>${game.name}</h4>
                    <p>${game.category} Game</p>
                </div>
                <span class="games-list-codes">${game.codes} Codes</span>
            </div>
        `).join('');
    }
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', () => {
            renderGames(allGames);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = allGames.filter(game => 
                game.name.toLowerCase().includes(query) ||
                game.category.toLowerCase().includes(query)
            );
            renderGames(filtered);
        });
    }
}

// Initialize new functions
document.addEventListener('DOMContentLoaded', () => {
    initGamesCategoryFilter();
    initGamesModal();
});