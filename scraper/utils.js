const baseUrl = 'https://guide.michelin.com/'

const query = 'kr/ko/selection/south-korea/restaurants/page/';

const itemsPerPage = 20;

const ratingsMap = {
  o: 3,
  n: 2,
  m: 1,
};

const selectors = {
  cards: '.card__menu.selection-card', // 카드 요소
  rating: '.card__menu-content--distinction .michelin-award', // 레스토랑의 등급 아이콘
  name: '.card__menu-content--title a', // 식당 이름
  link: '.card__menu-content--title a', // 링크
  city: '.card__menu-footer--score.pl-text:first-child', // 위치 정보
  type: '.card__menu-footer--score.pl-text:last-child', // 요리 타입
  img: '.image-wrapper.pl-image', // 이미지 요소
  phone: '.collapse__block-title a', // 상세페이지의 전화번호
  location: '.data-sheet__block--text', // 상세페이지의 주소
  description: '.data-sheet__description' // 상세페이지의 설명
};

const regEx = {
  img: /(?<=src=").*(?=" alt)/,
  totalItems: /(?<=of ).*(?= restaurants)/
}

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = { baseUrl, query, itemsPerPage, ratingsMap, selectors, regEx, timeout };
