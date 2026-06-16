'use strict';
// 1. Navbar Scroll Effect
const navbar = document.getElementById('navbar');
function handleNavbarScroll() {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
// 2. Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function setActiveNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
      });
    }
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });
// 3. Mobile Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});
navLinksContainer.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target) && navLinksContainer.classList.contains('open')) {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  }
});
// 4. Dark Mode Toggle
const darkToggle = document.getElementById('darkToggle');
const toggleIcon = darkToggle.querySelector('.toggle-icon');
const body = document.body;
const savedTheme = localStorage.getItem('nayepankh-theme');
if (savedTheme === 'dark') { body.classList.add('dark'); toggleIcon.textContent = '☀️'; }
darkToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  toggleIcon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('nayepankh-theme', isDark ? 'dark' : 'light');
});
// 5. Fade-in on Scroll
const fadeElements = document.querySelectorAll('.fade-in');
const heroContent = document.querySelector('.hero-content');
const heroImageWrapper = document.querySelector('.hero-image-wrapper');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const children = entry.target.querySelectorAll(':scope > *');
      children.forEach((child, i) => { child.style.transitionDelay = `${i * 0.1}s`; });
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
fadeElements.forEach((el) => fadeObserver.observe(el));
window.addEventListener('load', () => {
  setTimeout(() => { if (heroContent) heroContent.classList.add('visible'); }, 100);
  setTimeout(() => { if (heroImageWrapper) heroImageWrapper.classList.add('visible'); }, 300);
});
// 6. Animated Counters
const statNumbers = document.querySelectorAll('.stat-number');
let countersStarted = false;
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(easedProgress * target).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString('en-IN');
  }
  requestAnimationFrame(update);
}
const impactSection = document.getElementById('impact');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      statNumbers.forEach((el) => animateCounter(el));
    }
  });
}, { threshold: 0.4 });
if (impactSection) counterObserver.observe(impactSection);
// 7. Back to Top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
// 8. Contact Form
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) {
      [document.getElementById('name'), document.getElementById('email'), document.getElementById('message')].forEach((field) => {
        if (!field.value.trim()) {
          field.style.borderColor = '#e53935';
          field.style.animation = 'shake 0.4s ease';
          setTimeout(() => { field.style.animation = ''; field.style.borderColor = ''; }, 500);
        }
      });
      return;
    }
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    setTimeout(() => {
      formSuccess.classList.add('show');
      contactForm.reset();
      submitBtn.textContent = 'Send Message 📩';
      submitBtn.disabled = false;
      submitBtn.style.opacity = '';
      setTimeout(() => formSuccess.classList.remove('show'), 4500);
    }, 1200);
  });
}
// 9. Program card keyboard nav
document.querySelectorAll('.program-card').forEach((card) => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const link = card.querySelector('.program-link');
      if (link) link.click();
    }
  });
});
// 10. Shake animation
(function() {
  const style = document.createElement('style');
  style.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }`;
  document.head.appendChild(style);
})();
