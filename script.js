// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const burger = document.getElementById('burger');
const menuWrap = document.querySelector('nav');
burger.addEventListener('click', () => {
  const open = menuWrap.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
document.querySelectorAll('#menu a').forEach(a => a.addEventListener('click', () => {
  menuWrap.classList.remove('open'); burger.setAttribute('aria-expanded', 'false');
}));

// Navbar background + back-to-top visibility
const nav = document.getElementById('nav');
const toTop = document.getElementById('top');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', scrollY > 30);
  toTop.classList.toggle('show', scrollY > 500);
}, { passive: true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Active nav link highlighting
const links = [...document.querySelectorAll('#menu a')];
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));

// Contact form validation
const form = document.getElementById('form');
const status = document.getElementById('status');
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  ['name', 'email', 'subject', 'message'].forEach(id => {
    const f = form.elements[id], err = document.getElementById('e-' + id);
    let msg = '';
    if (!f.value.trim()) msg = 'This field is required.';
    else if (id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) msg = 'Enter a valid email address.';
    err.textContent = msg; f.setAttribute('aria-invalid', !!msg);
    if (msg) ok = false;
  });
  if (!ok) return;
  // No backend: open the visitor's email app. Replace with fetch() to Formspree/Netlify for real delivery.
  const body = encodeURIComponent(form.message.value + '\n\nFrom: ' + form.name.value + ' (' + form.email.value + ')');
  location.href = 'mailto:hariharank.s.1223@gmail.com?subject=' + encodeURIComponent(form.subject.value) + '&body=' + body;
  status.textContent = 'Opening your email app...';
});
