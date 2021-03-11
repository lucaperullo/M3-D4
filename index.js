let BooksStorage = [];
let cart = [];
const startEngine = () => {
  getAlbums();
  hideSpinner();
};
async function getAlbums() {
  const response = await fetch("https://striveschool-api.herokuapp.com/books");
  const data = await response.json();
  console.log(data);
  BooksStorage.push(data);
  createCart(data);
  displayResults(data.splice(0, 25));
  displayResults2(data.splice(0, 25));

  return data;
}
const displayResults = async (data) => {
  console.log(data);
  let mainContent = document.querySelector(".splide__list");
  data.forEach((data) => {
    mainContent.innerHTML += `<li class="splide__slide"><div class="container"><img
    class="carousel-img"
    src="${data.img}" height=250 width="145"
    alt=""/><div class="book-btns"><p class="price">${data.price}$</p><i  onclick="addToCart(${data.asin})" class="fas fa-cart-arrow-down"></i><i onclick="openInfo()"class="fas fa-info-circle"></i></div></div></li>`;
  });
  await new Splide("#splide", {
    perPage: 7,
    breakpoints: {
      1583: {
        perPage: 6,
      },
      1000: {
        perPage: 4,
      },
      577: {
        perPage: 3,
      },
    },
  }).mount();
};

const displayResults2 = async (data) => {
  console.log(data);
  let mainContent = document.querySelector("#splide-list-2");
  data.forEach((data) => {
    mainContent.innerHTML += `<li class="splide__slide"><div class="container"><img
    class="carousel-img"
    src="${data.img}" height=250 width="145"
    alt=""/><div class="book-btns"><p class="price">${data.price}$</p><img class="d-none" src="${data.img}"/><i  onclick="addToCart(${data.asin})" class="fas fa-cart-arrow-down"></i><i onclick="openInfo()"class="fas fa-info-circle"></i></div></div></li>`;
  });
  await new Splide("#splide2", {
    perPage: 7,
    breakpoints: {
      1583: {
        perPage: 6,
      },
      1000: {
        perPage: 5,
      },
      577: {
        perPage: 1,
      },
    },
  }).mount();
};

// const displayScifi = async (data) => {
//   console.log(data);
//   let mainContent = document.querySelector("#splide-list-3");
//   data.forEach((data) => {
//     mainContent.innerHTML += `<li class="splide__slide"><div class="container"><img
//             class="carousel-img"
//             src="${data.img}" height=250 width="145"
//             alt=""/><div class="book-btns"><i class="fas fa-cart-arrow-down"></i></div></div></li>`;
//   });
//   await new Splide("#splide3", {
//     perPage: 7,
//     breakpoints: {
//       1583: {
//         perPage: 6,
//       },
//       1000: {
//         perPage: 4,
//       },
//       577: {
//         perPage: 3,
//       },
//     },
//   }).mount();
// };
const hideSpinner = () => {
  let spinner = document.querySelector(".center");
  spinner.classList.toggle("d-none");
};
const addToCart = (bookid) => {
  const currentCart = localStorage.getItem("cart");
  if (currentCart === null) {
    localStorage.setItem("cart", bookid.toString() + ",");
  } else {
    let formatCart = currentCart.split(",");
    if (formatCart.length === 2 && formatCart[1] === "") formatCart.pop();
    console.log(formatCart.length);
    formatCart.push(bookid.toString());
    console.log(formatCart);
    formatCart = formatCart.join(",");
    console.log(formatCart);
    localStorage.setItem("cart", formatCart);
  }

  console.log(bookid);
};
const createCart = (data) => {
  const actualCart = localStorage.getItem("cart");
  if (actualCart) {
    const array = actualCart.split(",");
    if (array.length === 2 && array[1] === "") array.pop();
    console.log(array);
    const filter = array.map((bookid) => {
      const indexOfBook = data.findIndex((book) => book.asin === bookid);
      if (indexOfBook !== -1) {
        return data[indexOfBook];
      }
    });
    console.log(filter);
  }
};
window.onload = setTimeout(startEngine, 1000);
