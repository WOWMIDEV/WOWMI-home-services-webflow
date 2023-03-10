import { getContentElement } from '../../utils';

import { renderReviews } from './render';
import { getReviews } from './api';

const initReviews = () => {
  const configRequest = {
    base: 'https://services.wowmi.us/api/web/api/v1/yelp',
  };

  const elements = {
    sectionYelp: document.querySelector('[data-yelp="section"]'),
    wrapperYelp: document.querySelector('[data-yelp="wrapper"]'),
    city: document.querySelector('[data-yelp="city"]'),
    userAddress: document.querySelector('[data-yelp="user-address"]'),
    terms: {
      delivery: document.querySelector('[data-yelp="delivery"]'),
      movers: document.querySelector('[data-yelp="movers"]'),
      restaurants: document.querySelector('[data-yelp="restaurants"]'),
      'home services': document.querySelector('[data-yelp="home services"]'),
    },
  };

  const { userAddress, city, sectionYelp } = elements;

  if (!sectionYelp) {
    // eslint-disable-next-line no-console
    console.warn('No section yelp');
    return false;
  }

  const { base } = configRequest;
  const cityName = getContentElement(city);
  const url = new URL(base);

  if (userAddress) {
    const userAddressFormatted = userAddress.innerText.replaceAll(/\s\s?/gi, ' ').replaceAll(' ,', ',');
    url.searchParams.set('city', userAddressFormatted);
  } else {
    url.searchParams.set('city', cityName);
  }

  getReviews(url.href).then((reviews) => {
    if (!reviews) {
      sectionYelp.remove();
    }

    renderReviews(elements, reviews);
  });

  return true;
};

initReviews();
