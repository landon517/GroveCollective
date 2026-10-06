document.addEventListener('DOMContentLoaded', () => {

  const yearEl = document.getElementById('mpYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const filterBtns = document.querySelectorAll('.mp-filter-btn');
  const cards = document.querySelectorAll('.mp-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const value = btn.dataset.filter;
      cards.forEach(card => {
        const match = value === 'all' || card.dataset.category === value;
        card.classList.toggle('hidden', !match);
      });
    });
  });

});
