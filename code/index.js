const url = `https://api.unsplash.com/photos/?client_id=Zjv0lg960EcrCnJrhnRkIG8zl73q-RiIss63lMqzHn0`;
const getSearchURL = (query) =>
  `https://api.unsplash.com/search/photos?query=${query}&client_id=Zjv0lg960EcrCnJrhnRkIG8zl73q-RiIss63lMqzHn0`;
const root = document.querySelector('.images');
const searchElm = document.querySelector('input');

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));
  xhr.onerror = function () {
    console.error('Something went wrong!');
  };
  xhr.send();
}

function displayImages(images) {
  root.innerHTML = '';
  images.forEach((image) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = image.urls.thumb;
    li.append(img);
    root.append(li);
  });
}

fetch(url, displayImages);

function handleSearch(event) {
  if (event.keyCode === 13 && searchElm.value) {
    fetch(getSearchURL(searchElm.value), (searchResult) => {
      displayImages(searchResult.results);
    });
    searchElm.value = '';
  }
}
searchElm.addEventListener('keyup', handleSearch);
