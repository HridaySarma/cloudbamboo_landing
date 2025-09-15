// Advanced animation utilities for CloudBamboo Digital landing page

export const initializeAnimations = () => {
  // Parallax effect for hero section
  const handleParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  };

  // Intersection Observer for reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Stagger animations for children
        const children = entry.target.querySelectorAll('.stagger-item');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('revealed');
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe all elements with scroll-reveal class
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    observer.observe(el);
  });

  // Mouse move effect for floating cards
  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll('.floating-card');
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    cards.forEach((card, index) => {
      const factor = (index + 1) * 0.02;
      const x = (clientX - centerX) * factor;
      const y = (clientY - centerY) * factor;
      
      card.style.transform = `translate(${x}px, ${y}px)`;
    });
  };

  // Smooth scroll for navigation links
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const headerOffset = 80;
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Add event listeners
  window.addEventListener('scroll', handleParallax);
  window.addEventListener('mousemove', handleMouseMove);
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleSmoothScroll);
  });

  // Animated counter for statistics
  const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    updateCounter();
  };

  // Initialize counters when visible
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
  });

  // Typing effect for hero title - DISABLED to fix doubled text issue
  // const typeWriter = (element, text, speed = 50) => {
  //   let i = 0;
  //   element.textContent = '';
  //
  //   const type = () => {
  //     if (i < text.length) {
  //       element.textContent += text.charAt(i);
  //       i++;
  //       setTimeout(type, speed);
  //     }
  //   };
  //
  //   type();
  // };

  // Initialize typing effect - DISABLED
  // const heroTitle = document.querySelector('.hero-title');
  // if (heroTitle) {
  //   const originalText = heroTitle.textContent;
  //   setTimeout(() => {
  //     typeWriter(heroTitle, originalText, 30);
  //   }, 500);
  // }

  // Magnetic button effect
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });

  // Particle effect
  const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.animationDuration = Math.random() * 10 + 10 + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    document.querySelector('.particles')?.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 20000);
  };

  // Create particles periodically
  const particlesContainer = document.querySelector('.particles');
  if (particlesContainer) {
    setInterval(createParticle, 1000);
    // Create initial particles
    for (let i = 0; i < 10; i++) {
      setTimeout(createParticle, i * 200);
    }
  }

  // Philosophy section particles
  const createPhilosophyParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'philosophy-particle';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.animationDuration = Math.random() * 10 + 15 + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.width = particle.style.height = Math.random() * 4 + 4 + 'px';
    
    const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    const philosophyParticles = document.querySelector('.philosophy-particles');
    if (philosophyParticles) {
      philosophyParticles.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 25000);
    }
  };

  // Create philosophy particles
  const philosophyParticlesContainer = document.querySelector('.philosophy-particles');
  if (philosophyParticlesContainer) {
    setInterval(createPhilosophyParticle, 800);
    // Create initial particles
    for (let i = 0; i < 15; i++) {
      setTimeout(createPhilosophyParticle, i * 150);
    }
  }
};

// Cursor effect
export const initializeCursor = () => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  const animateCursor = () => {
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    
    cursorX += distX * 0.1;
    cursorY += distY * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    
    requestAnimationFrame(animateCursor);
  };
  
  animateCursor();
  
  // Hover effects
  document.querySelectorAll('a, button, .feature-card, .philosophy-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursorDot.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursorDot.classList.remove('hover');
    });
  });
};