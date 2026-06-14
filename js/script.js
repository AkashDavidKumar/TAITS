/* ==========================================================================
           INTRO ANIMATION LOGIC
           ========================================================================== */
        window.addEventListener('load', () => {
            setTimeout(() => {
                const introScreen = document.getElementById('intro-screen');
                introScreen.style.opacity = '0';
                setTimeout(() => {
                    introScreen.style.display = 'none';
                    // Trigger scroll animations immediately for top elements
                    document.querySelectorAll('.reveal').forEach(el => {
                        if(el.getBoundingClientRect().top < window.innerHeight) {
                            el.classList.add('active');
                        }
                    });
                }, 1000);
            }, 2500); // 2.5s display time
        });

        /* ==========================================================================
           CUSTOM CURSOR (GPU Accelerated & Touch Disabled)
           ========================================================================== */
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        if (cursorDot && cursorOutline) {
            let mouseX = window.innerWidth / 2;
            let mouseY = window.innerHeight / 2;
            let outlineX = mouseX;
            let outlineY = mouseY;
            
            // Disable custom cursors completely on mobile/tablet viewports or touch devices
            const isMobileOrTablet = window.innerWidth <= 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            if (isMobileOrTablet) {
                cursorDot.style.display = 'none';
                cursorOutline.style.display = 'none';
                document.body.style.cursor = 'default';
            } else {
                window.addEventListener('mousemove', (e) => {
                    mouseX = e.clientX;
                    mouseY = e.clientY;
                    // Move dot instantly using GPU-accelerated translate3d
                    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
                });

                // Smooth outline lag using requestAnimationFrame lerp loop
                const updateOutline = () => {
                    const ease = 0.12; // Lower value = more lag/smoothness
                    outlineX += (mouseX - outlineX) * ease;
                    outlineY += (mouseY - outlineY) * ease;
                    
                    cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
                    requestAnimationFrame(updateOutline);
                };
                requestAnimationFrame(updateOutline);

                // Cursor Hover states
                document.querySelectorAll('a, button, .btn, .btn-magnetic, .info-node, .service-card').forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        cursorOutline.classList.add('hovering');
                        cursorDot.style.backgroundColor = 'var(--luxury-gold)';
                    });
                    el.addEventListener('mouseleave', () => {
                        cursorOutline.classList.remove('hovering');
                        cursorDot.style.backgroundColor = 'var(--electric-blue)';
                    });
                });
            }
        }

        /* ==========================================================================
           MAGNETIC BUTTONS
           ========================================================================== */
        document.querySelectorAll('.btn-magnetic').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Max movement range
                const range = 15;
                const moveX = (x / rect.width) * range;
                const moveY = (y / rect.height) * range;

                btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = `translate(0px, 0px)`;
                btn.style.transition = `transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
            });
            
            btn.addEventListener('mouseenter', () => {
                btn.style.transition = `none`; // Remove transition for smooth magnetic pull
            });
        });

        /* ==========================================================================
           3D CARD TILT EFFECT (Services)
           ========================================================================== */
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
                const rotateY = ((x - centerX) / centerX) * 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });

        /* ==========================================================================
           SCROLL REVEAL (Intersection Observer)
           ========================================================================== */
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once revealed
                    observer.unobserve(entry.target);
                    
                    // Trigger counter if it's the stats section
                    if(entry.target.classList.contains('stats-wrap')) {
                        startCounters();
                    }
                }
            });
        };

        const revealOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

        /* ==========================================================================
           NAVBAR SCROLL EFFECT
           ========================================================================== */
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        /* ==========================================================================
           NUMBER COUNTER ANIMATION
           ========================================================================== */
        function startCounters() {
            const counters = document.querySelectorAll('.stat-num');
            const speed = 200; // The lower the slower

            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const updateCount = () => {
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCount();
            });
        }

        /* ==========================================================================
           TIMELINE PROGRESS ANIMATION
           ========================================================================== */
        const processTrack = document.getElementById('process-track');
        const processFill = document.getElementById('process-fill');
        
        window.addEventListener('scroll', () => {
            if(!processTrack) return;
            const rect = processTrack.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate progress
            if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                const scrolled = (windowHeight * 0.8 - rect.top);
                const total = rect.height;
                let percentage = (scrolled / total) * 100;
                
                percentage = Math.max(0, Math.min(100, percentage));
                processFill.style.width = percentage + '%';
            }
        });

        /* ==========================================================================
           CIRCULAR INFOGRAPHIC POSITIONING (Why Choose Us)
           ========================================================================== */
        const container = document.getElementById('infographic');
        
        const positionNodes = () => {
            if (!container) return;
            const nodes = container.querySelectorAll('.info-node');
            const centerNode = container.querySelector('.info-center');
            
            if (window.innerWidth > 1024) {
                const radius = 220; // Radius of the circle
                const center = 300; // Center coordinate
                const angleStep = (Math.PI * 2) / nodes.length;

                nodes.forEach((node, index) => {
                    const angle = index * angleStep - Math.PI / 2; // Start from top
                    const x = center + radius * Math.cos(angle) - 30; // 30 is half node width
                    const y = center + radius * Math.sin(angle) - 30;

                    node.style.position = 'absolute';
                    node.style.left = `${x}px`;
                    node.style.top = `${y}px`;
                    node.style.transform = '';
                    
                    const tooltip = node.querySelector('.info-tooltip');
                    if (tooltip) {
                        tooltip.style.opacity = '';
                        tooltip.style.pointerEvents = '';
                    }
                });
                
                if (centerNode) {
                    centerNode.style.position = 'absolute';
                }
            } else {
                // Mobile/Tablet layout: clear absolute placement and let CSS list style take over
                nodes.forEach(node => {
                    node.style.position = 'relative';
                    node.style.left = '';
                    node.style.top = '';
                    node.style.transform = '';
                    
                    const tooltip = node.querySelector('.info-tooltip');
                    if (tooltip) {
                        tooltip.style.opacity = '1';
                        tooltip.style.pointerEvents = 'auto';
                    }
                });
                
                if (centerNode) {
                    centerNode.style.position = 'relative';
                }
            }
        };

        // Position nodes on load and debounced window resize
        if (container) {
            positionNodes();
            let positionTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(positionTimeout);
                positionTimeout = setTimeout(positionNodes, 100);
            });
        }

        /* ==========================================================================
           PARTICLE BACKGROUND (Canvas API - Optimized & Throttled)
           ========================================================================== */
        const canvas = document.getElementById('bg-canvas');
        let initParticles = () => {}; // Declare in outer scope for theme toggle access
        
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let particlesArray = [];
            let animationFrameId = null;
            let resizeTimeout = null;
            let isTabActive = true;

            const updateCanvasSize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };
            updateCanvasSize();

            class Particle {
                constructor(x, y, directionX, directionY, size, color) {
                    this.x = x;
                    this.y = y;
                    this.directionX = directionX;
                    this.directionY = directionY;
                    this.size = size;
                    this.color = color;
                }
                draw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                }
                update() {
                    if (this.x > canvas.width || this.x < 0) {
                        this.directionX = -this.directionX;
                    }
                    if (this.y > canvas.height || this.y < 0) {
                        this.directionY = -this.directionY;
                    }
                    this.x += this.directionX;
                    this.y += this.directionY;
                    this.draw();
                }
            }

            initParticles = () => {
                particlesArray = [];
                const area = canvas.width * canvas.height;
                
                // Responsive density: fewer particles on mobile
                let maxParticles = window.innerWidth < 768 ? 25 : 65;
                let numberOfParticles = Math.min(Math.floor(area / 20000), maxParticles);
                
                const isLight = document.body.classList.contains('light-theme');
                const color = isLight ? 'rgba(21, 87, 255, 0.2)' : 'rgba(110, 46, 255, 0.25)';
                
                for (let i = 0; i < numberOfParticles; i++) {
                    const size = (Math.random() * 1.5) + 0.5;
                    const x = Math.random() * (canvas.width - size * 4) + size * 2;
                    const y = Math.random() * (canvas.height - size * 4) + size * 2;
                    const directionX = (Math.random() * 0.3) - 0.15;
                    const directionY = (Math.random() * 0.3) - 0.15;
                    
                    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
                }
            };

            function animateParticles() {
                if (!isTabActive) return;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const isLight = document.body.classList.contains('light-theme');
                const len = particlesArray.length;
                
                for (let i = 0; i < len; i++) {
                    particlesArray[i].update();
                    
                    // Connection web logic
                    for (let j = i + 1; j < len; j++) {
                        const dx = particlesArray[i].x - particlesArray[j].x;
                        const dy = particlesArray[i].y - particlesArray[j].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 110) {
                            ctx.beginPath();
                            ctx.strokeStyle = isLight 
                                ? `rgba(6, 26, 91, ${0.12 - distance/900})` 
                                : `rgba(45, 123, 255, ${0.08 - distance/1300})`;
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                            ctx.stroke();
                        }
                    }
                }
                
                animationFrameId = requestAnimationFrame(animateParticles);
            }

            // Debounced resize handler
            window.addEventListener('resize', () => {
                if (resizeTimeout) clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    updateCanvasSize();
                    initParticles();
                }, 150);
            });

            // Visibility API: Throttles rendering when window is minimized/tabbed out
            document.addEventListener('visibilitychange', () => {
                isTabActive = document.visibilityState === 'visible';
                if (isTabActive) {
                    if (!animationFrameId) {
                        animateParticles();
                    }
                } else {
                    if (animationFrameId) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = null;
                    }
                }
            });

            initParticles();
            animateParticles();
        }

        /* ==========================================================================
           THEME TOGGLE SYSTEM
           ========================================================================== */
        const themeToggles = document.querySelectorAll('.theme-toggle-btn');
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');
        const mobToggle = document.getElementById('theme-toggle-mob');
        
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('taits-theme');
        const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
            document.body.classList.add('light-theme');
            updateToggleIcons(true);
        }

        themeToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.classList.toggle('light-theme');
                const isLight = document.body.classList.contains('light-theme');
                
                localStorage.setItem('taits-theme', isLight ? 'light' : 'dark');
                updateToggleIcons(isLight);
                
                // Re-init particles to update color
                initParticles();
            });
        });

        function updateToggleIcons(isLight) {
            if (mobToggle) {
                mobToggle.innerHTML = isLight ? '🌙' : '☀️';
            }
            if (sunIcon && moonIcon) {
                sunIcon.style.display = isLight ? 'none' : 'block';
                moonIcon.style.display = isLight ? 'block' : 'none';
            }
        }

        // ==========================================================================
        // MOBILE HAMBURGER MENU TOGGLE
        // ==========================================================================
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
            });
            
            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.innerHTML = '☰';
                });
            });
        }