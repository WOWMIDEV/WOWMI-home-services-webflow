import Swiper from 'swiper';

const CLS_BIG_CARD = 'member__card--big';
const CLS_ACTIVE_CARD = 'member__card--active';
const MAX_OPENED_SLIDES = 4;
const CARDS_FOR_TABS = 8;

const tabsInit = (cards, wrapper, nextButton, prevButton) => {
  const state = { current: 0 };

  const getIsHidden = (index) =>
    index >= CARDS_FOR_TABS * (state.current + 1) || index < CARDS_FOR_TABS * state.current;

  const setHiddenCards = () => {
    cards.forEach((card, index) => {
      card.classList.remove('member__card--hidden');
      if (getIsHidden(index)) {
        card.classList.add('member__card--hidden');
      }
    });
  };

  const changeTab = (direction) => {
    const newTab = state.current + direction;
    const maxTab = Math.floor(cards.length / CARDS_FOR_TABS);
    if (newTab < 0) {
      state.current = maxTab;
    } else if (newTab > maxTab) {
      state.current = 0;
    } else {
      state.current = newTab;
    }
    wrapper.setAttribute('style', 'opacity: 0');
    setTimeout(() => {
      setHiddenCards();
      wrapper.setAttribute('style', 'opacity: 1');
    }, 300);
  };

  const updateStyles = () => {
    const width = document.documentElement.clientWidth;
    if (width >= 992) {
      wrapper.setAttribute('style', 'transition: opacity 0.3s ease 0s; transform: translate(-50%);');
    } else {
      wrapper.setAttribute('style', 'transition: transform 0.3s ease;');
    }
  };

  if (cards && cards.length > CARDS_FOR_TABS) {
    setHiddenCards();
    nextButton?.addEventListener('click', () => {
      changeTab(1);
    });
    prevButton?.addEventListener('click', () => {
      changeTab(-1);
    });
  } else if (nextButton && prevButton) {
    nextButton.setAttribute('style', 'display: none');
    prevButton.setAttribute('style', 'display: none');
  }
  window.addEventListener('resize', updateStyles);
};

const renderTotal = ({ membersHiddenList, membersTotal, membersCount }) => {
  const totalMembers = !membersHiddenList ? 0 : membersHiddenList.childElementCount;

  if (totalMembers <= 0) {
    membersTotal.remove();
    return true;
  }

  const membersCountEl = membersCount;

  membersCountEl.textContent = `+${totalMembers}`;
  return true;
};

const init = () => {
  const elements = {
    membersWrapper: document.querySelector('[data-members-cards="list"]'),
    memberCardsEls: document.querySelectorAll('[data-members-cards="item"]'),
    membersHiddenList: document.querySelector('[data-members="hidden-list"]'),
    membersTotal: document.querySelector('[data-members="total"]'),
    membersCount: document.querySelector('[data-members="count"]'),
    nextButton: document.querySelector('[data-members="slider-next"]'),
    prevButton: document.querySelector('[data-members="slider-prev"]'),
  };

  const { membersWrapper, memberCardsEls, nextButton, prevButton } = elements;

  if (!membersWrapper) return;

  const bigCardsEnabled = memberCardsEls.length <= MAX_OPENED_SLIDES;

  if (bigCardsEnabled) {
    memberCardsEls.forEach((card) => {
      card.classList.add(CLS_BIG_CARD);
    });
  }

  tabsInit(memberCardsEls, membersWrapper, nextButton, prevButton);

  const swiper = new Swiper('._w-dyn-list--members-cards', {
    wrapperClass: 'members-cards__list',
    slideClass: 'member__card',
    slideActiveClass: CLS_ACTIVE_CARD,
    updateOnImagesReady: false,
    navigation: false,
    enabled: true,
    spaceBetween: 10,
    touchRatio: 0.3,
    slidesPerView: 'auto',
    centeredSlides: true,
    setTransition: 300,
    on: {
      click: () => {
        if (document.documentElement.clientWidth < 992) {
          swiper.slideTo(swiper.clickedIndex);
        }
      },
    },
    breakpoints: {
      992: {
        enabled: false,
        spaceBetween: 0,
        slidesPerView: bigCardsEnabled ? Math.max(memberCardsEls.length, 3) : 'auto',
        centeredSlides: false,
      },
    },
  });

  window.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowRight') {
      swiper.slideNext();
    }
    if (event.code === 'ArrowLeft') {
      swiper.slidePrev();
    }
  });

  renderTotal(elements);
};

init();
