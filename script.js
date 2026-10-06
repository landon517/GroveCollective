document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     Footer year
  --------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     SCROLL REVEAL — elements fade/slide in on enter,
     fade/slide out on exit, in either scroll direction.
     Also fires for whatever is already in view on page load.
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -8% 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------
     EVENTS TICKER — duplicate content so the marquee loops
     seamlessly regardless of how many events are listed.
  --------------------------------------------------------- */
  const track = document.getElementById('tickerTrack');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* ---------------------------------------------------------
     CONTACT POPDOWN
  --------------------------------------------------------- */
  const contactBtn   = document.getElementById('contactBtn');
  const contactPanel = document.getElementById('contactPanel');

  if (contactBtn && contactPanel) {
    contactBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = contactPanel.classList.toggle('open');
      contactBtn.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!contactPanel.contains(e.target) && e.target !== contactBtn) {
        contactPanel.classList.remove('open');
        contactBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        contactPanel.classList.remove('open');
        contactBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------------------------------------------------
     VINE SCROLL PROGRESS — fills the signature vine line
     as the page scrolls, using the SVG path's own length.
  --------------------------------------------------------- */
  const vineFill = document.querySelector('.vine-fill');
  if (vineFill) {
    const pathLength = vineFill.getTotalLength();
    vineFill.style.strokeDasharray = pathLength;
    vineFill.style.strokeDashoffset = pathLength;

    const updateVine = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      vineFill.style.strokeDashoffset = pathLength - (pathLength * Math.min(progress, 1));
    };

    window.addEventListener('scroll', updateVine, { passive: true });
    updateVine();
  }

});
