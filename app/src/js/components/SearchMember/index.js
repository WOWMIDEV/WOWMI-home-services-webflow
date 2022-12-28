import onChange from 'on-change';

import { htmlList } from './htmlList';
import { api } from './api';

const BASE_URL = 'https://wowmiusa.com/api/ecosystem/members/prosperity';
const STATUS_IDLE = 'idle';
const STATUS_LOADING = 'loading';
const STATUS_TYPING = 'typing';

const handleInputSearch = (state) => (e) => {
  const draft = state;
  const {
    target: { value },
  } = e;

  draft.value = value.trim();
  draft.status = STATUS_TYPING;

  clearTimeout(draft.timer);

  draft.timer = setTimeout(() => {
    draft.status = STATUS_IDLE;
  }, state.timeOut);
};
const handleSearchShowResult = (elements, type) => () => {
  const { searchResult } = elements;

  const types = {
    show: 'block',
    hide: 'none',
  };

  searchResult.style.display = types[type];
};
const clearResult = (elements) => {
  const htmlElelements = elements;
  const { searchResult } = htmlElelements;

  searchResult.innerHTML = '';
};

const renderResult = (state, elements) => {
  const draft = state;
  const { value } = draft;
  const htmlElelements = elements;
  const { searchResult, searchInput } = htmlElelements;

  if (state.status !== STATUS_IDLE) {
    return false;
  }

  draft.status = STATUS_LOADING;
  searchInput.disabled = true;
  searchResult.innerHTML = '';

  api(`${BASE_URL}/${value}`).then((data) => {
    searchInput.disabled = false;
    searchInput.focus();

    if (data.length > 0) {
      const resultQuery = htmlList(data);
      const htmlSearchResultList = data.length > 0 ? resultQuery : null;
      searchResult.insertAdjacentHTML('afterbegin', htmlSearchResultList);
    }
  });

  return true;
};

const firstRender = (state, elements) => {
  const htmlElements = elements;
  const { root } = htmlElements;

  const searchWrapper = document.createElement('div');
  searchWrapper.id = 'searchWrapper';
  htmlElements.searchWrapper = searchWrapper;
  searchWrapper.addEventListener('mouseover', handleSearchShowResult(elements, 'show'));
  searchWrapper.addEventListener('mouseleave', handleSearchShowResult(elements, 'hide'));

  const searchLabel = document.createElement('label');
  searchLabel.classList.add('searchLabel');

  const searchLabelName = document.createElement('span');
  searchLabelName.textContent = 'Search:';
  searchLabelName.classList.add('searchLabelName');

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.name = 'searchInput';
  searchInput.classList.add('searchInput');
  searchInput.placeholder = 'Enter name ...';
  searchInput.addEventListener('input', handleInputSearch(state));
  htmlElements.searchInput = searchInput;

  const searchLoading = document.createElement('span');
  searchLoading.classList.add('searchLoading');

  const searchResult = document.createElement('div');
  searchResult.classList.add('searchResult');
  htmlElements.searchResult = searchResult;

  searchLabel.append(searchLabelName);
  searchLabel.append(searchInput);
  searchLabel.append(searchLoading);
  searchWrapper.append(searchLabel);
  searchWrapper.append(searchResult);

  root.insertAdjacentElement('afterbegin', searchWrapper);
};

const init = () => {
  const elements = {
    root: document.querySelector('[data-search="members"]'),
    searchWrapper: null,
    searchInput: null,
    searchResult: null,
  };

  if (!elements.root) {
    return false;
  }

  const state = {
    baseUrl: BASE_URL,
    status: STATUS_IDLE,
    value: null,
    timer: null,
    timeOut: 1000,
  };

  const watchedState = onChange(state, (path, value) => {
    if (path === 'value' && value.length < 3) {
      clearResult(elements);
    }

    if (value === STATUS_IDLE && state.value.length >= 3) {
      renderResult(watchedState, elements);
    }
  });

  firstRender(watchedState, elements);

  return true;
};

init();
