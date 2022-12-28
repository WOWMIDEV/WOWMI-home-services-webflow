import phoneSvg from '../../../svg/phone.svg';
import noImage from '../../../img/noimage.jpeg';

import { formatPhoneNumber, getRateClass } from '../../utils';

const phoneSrc = new URL(phoneSvg, import.meta.url);
const phoneHtml = (phone) => {
  if (!phone) {
    return '';
  }

  return `<a href="${phone}" class="yelp__number">${formatPhoneNumber(phone)}</a>`;
};

const reviewContent = (yelpReviews) => {
  const { text, url } = yelpReviews;

  return `
    <p class="paragraph yelp__text">${text}</p>
    <a href="${url}" class="yelp__link btn btn--min w-inline-block" target="_blank">
      <span class="btn__text btn__text--min">Read more on Yelp</span>
    </a>`;
};

export const htmlTemplateReview = (review) => {
  const { address, rating, phone, review_count: totalReviews, name, image_url: imageUrl, yelpReviews } = review;

  return `
    <div class="tabs__card yelp">
      <img alt="Yelp preview"
          loading="lazy"
          src="${imageUrl === '' ? noImage : imageUrl}"
          class="yelp__img">

      <div class="yelp__content">
        <div class="yelp__title">${name}</div>
        <div class="yelp__rate">
          <div class="yelp__rate-stars yelp__rate-stars--${getRateClass(rating)}"></div>
          <div class="yelp__rate-text">${totalReviews} reviews</div>
        </div>

        ${yelpReviews.length ? reviewContent(yelpReviews[0]) : '<p class="paragraph yelp__text">No content</p>'}
      </div>

      <div class="yelp__phone">
        <span class="ico">
          <img src="${phoneSrc}" class="phone" alt="phone"/>
        </span>
        ${phoneHtml(phone)}
        <span class="yelp__location">${address}</span>
      </div>
    </div>
    `;
};
