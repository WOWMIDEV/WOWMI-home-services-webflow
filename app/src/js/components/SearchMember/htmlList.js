const htmlListItem = ({ domain, slug, name, headshot, city, state }) => {
  const locationCity = city ? `${city}, ` : '';
  const locationState = state ?? '';

  const href = domain ? `https://${domain}` : `mortgageconsultant/${slug}`;

  return `<li class="searchResultItem">
              <a class="searchResultLink" href="${href}">
                <img class="searchMemberImage"
                     alt="${name}"
                     src="${headshot}"/>
              <span class="searchMemberData">
                <span class="searchMemberName">${name}</span>
                <span class="searchMemberLocation">${locationCity}${locationState}</span>
              </span>
              </a>
            </li>`;
};

export const htmlList = (items) => {
  const list = items.map((item) => htmlListItem(item)).join('');
  return `<ul class="searchList">${list}</ul>`;
};
