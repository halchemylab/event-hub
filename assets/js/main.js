document.addEventListener('DOMContentLoaded', () => {
  // Countdown timer
  const countdownElement = document.getElementById('event-countdown');
  if (countdownElement) {
    const eventDate = new Date(countdownElement.dataset.eventDate).getTime();

    const countdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      if (distance < 0) {
        clearInterval(interval);
        countdownElement.innerHTML = "Event has started";
      }
    };

    const interval = setInterval(countdown, 1000);
  }

  // Event filtering
  const seriesFilterGroup = document.getElementById('series-filter-group');
  const partnerFilterGroup = document.getElementById('partner-filter-group');
  const resetFiltersButton = document.getElementById('reset-filters');
  const eventCards = Array.from(document.querySelectorAll('.event-card'));

  if (seriesFilterGroup && partnerFilterGroup && eventCards.length > 0) {
    const series = [...new Set(eventCards.map(card => card.dataset.series).filter(Boolean))];
    const partners = [...new Set(eventCards.map(card => card.dataset.partner).filter(Boolean))];

    const createFilterButtons = (items, group, filterType) => {
      items.forEach(item => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-secondary');
        button.dataset.filter = item;
        button.dataset.filterType = filterType;
        button.textContent = item;
        group.appendChild(button);
      });
    };

    createFilterButtons(series, seriesFilterGroup, 'series');
    createFilterButtons(partners, partnerFilterGroup, 'partner');

    const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));

    const filterEvents = () => {
      const activeFilters = filterButtons.filter(button => button.classList.contains('active'));
      const activeSeries = activeFilters.filter(button => button.dataset.filterType === 'series').map(button => button.dataset.filter);
      const activePartners = activeFilters.filter(button => button.dataset.filterType === 'partner').map(button => button.dataset.filter);

      eventCards.forEach(card => {
        const cardSeries = card.dataset.series;
        const cardPartner = card.dataset.partner;

        const seriesMatch = activeSeries.length === 0 || activeSeries.includes(cardSeries);
        const partnerMatch = activePartners.length === 0 || activePartners.includes(cardPartner);

        if (seriesMatch && partnerMatch) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    };

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        button.classList.toggle('active');
        filterEvents();
      });
    });

    resetFiltersButton.addEventListener('click', () => {
      filterButtons.forEach(button => button.classList.remove('active'));
      filterEvents();
    });
  }
});
