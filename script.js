/* ========================================
   Constellation Canvas — Hero Background
   ======================================== */
class ConstellationCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodes = [];
    this.resize();
    this.init();
    this.animate();
    window.addEventListener('resize', () => {
      this.resize();
      this.nodes = [];
      this.init();
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    const area = this.canvas.width * this.canvas.height;
    const count = Math.min(Math.floor(area / 14000), 100);

    for (let i = 0; i < count; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.5,
        orange: Math.random() < 0.15
      });
    }
  }

  animate() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Move nodes
    this.nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    });

    // Draw connections
    const maxDist = 130;
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i];
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.22;
          const isOrange = a.orange || b.orange;
          ctx.strokeStyle = isOrange
            ? `rgba(255, 102, 0, ${opacity})`
            : `rgba(224, 224, 224, ${opacity * 0.35})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    this.nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.orange
        ? 'rgba(255, 102, 0, 0.8)'
        : 'rgba(224, 224, 224, 0.35)';
      ctx.fill();

      // Glow on orange nodes
      if (n.orange) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 102, 0, 0.06)';
        ctx.fill();
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}

/* ========================================
   Typewriter Effect
   ======================================== */
function typeWriter(element, text, speed) {
  speed = speed || 55;
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  element.appendChild(cursor);

  function type() {
    if (i < text.length) {
      element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
      i++;
      setTimeout(type, speed);
    }
  }

  setTimeout(type, 900);
}

/* ========================================
   Scroll Progress Bar
   ======================================== */
function updateScrollProgress() {
  var bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  var scrollTop = document.documentElement.scrollTop;
  var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  bar.style.width = progress + '%';
}

/* ========================================
   Nav Scroll State
   ======================================== */
function updateNavState() {
  var nav = document.querySelector('.main-nav');
  if (!nav) return;
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

/* ========================================
   Scroll Spy — Active Nav Link
   ======================================== */
function updateScrollSpy() {
  var sections = document.querySelectorAll('.section');
  var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  var current = '';

  sections.forEach(function(section) {
    var top = section.offsetTop - 140;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(function(link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

/* ========================================
   Scroll Animations — Intersection Observer
   ======================================== */
function initScrollAnimations() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Stagger skill tags inside this element
        var tags = entry.target.querySelectorAll('.skill-tag');
        tags.forEach(function(tag, index) {
          setTimeout(function() {
            tag.classList.add('visible');
          }, index * 50);
        });
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
    observer.observe(el);
  });
}

/* ========================================
   Timeline — Expand / Collapse
   ======================================== */
function initTimeline() {
  document.querySelectorAll('[data-expandable]').forEach(function(card) {
    card.addEventListener('click', function() {
      // Close others
      document.querySelectorAll('[data-expandable].expanded').forEach(function(other) {
        if (other !== card) {
          other.classList.remove('expanded');
          other.classList.remove('fully-expanded');
          var otherBtn = other.querySelector('.timeline-read-more');
          if (otherBtn) otherBtn.textContent = 'Read more';
        }
      });
      var willExpand = !card.classList.contains('expanded');
      card.classList.toggle('expanded');
      // Reset fully-expanded state and button text when collapsing
      if (!willExpand) {
        card.classList.remove('fully-expanded');
        var btn = card.querySelector('.timeline-read-more');
        if (btn) btn.textContent = 'Read more';
      }
    });

    // Read more / less toggle — don't propagate to card click
    var readMoreBtn = card.querySelector('.timeline-read-more');
    if (readMoreBtn) {
      readMoreBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        card.classList.toggle('fully-expanded');
        readMoreBtn.textContent = card.classList.contains('fully-expanded') ? 'Read less' : 'Read more';
      });
    }
  });
}

/* ========================================
   Project Detail Modal
   ======================================== */
function initProjectModals() {
  var modal = document.getElementById('project-modal');
  if (!modal) return;
  var body = modal.querySelector('.project-modal-body');

  function openModal(projectId) {
    var template = document.getElementById('project-detail-' + projectId);
    if (!template) return;
    body.innerHTML = '';
    body.appendChild(template.content.cloneNode(true));
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modal.querySelector('.project-modal-close').focus();
  }

  function closeModal() {
    var video = body.querySelector('video');
    if (video) video.pause();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  document.querySelectorAll('.project-card[data-project]').forEach(function(card) {
    card.addEventListener('click', function() {
      openModal(card.getAttribute('data-project'));
    });
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.getAttribute('data-project'));
      }
    });
  });

  modal.querySelectorAll('[data-modal-close]').forEach(function(el) {
    el.addEventListener('click', closeModal);
  });

  // Inline links that scroll to the projects section, then open a modal
  document.querySelectorAll('[data-open-project]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var projectId = link.getAttribute('data-open-project');
      var target = document.querySelector('#projects');
      if (!target) {
        openModal(projectId);
        return;
      }
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Open once the smooth scroll settles (scrollend where supported,
      // timer fallback elsewhere) so the scroll lock doesn't freeze it mid-flight
      var opened = false;
      var open = function() {
        if (opened) return;
        opened = true;
        window.removeEventListener('scrollend', open);
        openModal(projectId);
      };
      if ('onscrollend' in window) {
        window.addEventListener('scrollend', open, { once: true });
        setTimeout(open, 1500);
      } else {
        setTimeout(open, 800);
      }
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ========================================
   Mobile Nav Toggle
   ======================================== */
function initMobileNav() {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close when tapping a link
  links.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

/* ========================================
   Smooth Scroll for Anchor Links
   ======================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '#hero') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ========================================
   Init
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
  // Hero constellation
  var canvas = document.getElementById('hero-canvas');
  if (canvas) {
    new ConstellationCanvas(canvas);
  }

  // Typewriter
  var tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    typeWriter(tagline, 'Optimizing business solutions by applying AI and ML expertise.');
  }

  // Canvas fade overlay
  var canvasFade = document.querySelector('.canvas-fade');

  // Scroll listeners
  window.addEventListener('scroll', function() {
    updateScrollProgress();
    updateNavState();
    updateScrollSpy();

    // Fade canvas as user scrolls — fully transparent at top, nearly opaque by ~1500px
    if (canvasFade) {
      var scrollY = window.scrollY;
      var opacity = Math.min(scrollY / 2500, 0.92);
      canvasFade.style.background = 'rgba(13, 13, 13, ' + opacity + ')';
    }
  }, { passive: true });

  // Init modules
  initScrollAnimations();
  initTimeline();
  initProjectModals();
  initMobileNav();
  initSmoothScroll();
});
