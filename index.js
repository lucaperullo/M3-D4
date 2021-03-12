let BooksStorage = [];
let cart = [];
const startEngine = () => {
  getAlbums();
  hideSpinner();
  counterUpdater();
};
async function getAlbums() {
  const response = await fetch("https://striveschool-api.herokuapp.com/books");
  const data = await response.json();
  console.log(data);
  BooksStorage.push(data);
  createCart(data);
  displayResults(data);
  displayResults2(data);

  return data;
}
const displayResults = async (data) => {
  console.log(data);
  let mainContent = document.querySelector(".splide__list");
  data.forEach((data) => {
    mainContent.innerHTML += `<li class="splide__slide"><div class="container"><img
    class="carousel-img"
    src="${data.img}" height=250 width="145"
    alt=""/><div class="book-btns"><p class="price">${data.price}$</p><i data-attribute="${data.asin}" onclick="addToCart(event)" class="fas fa-cart-arrow-down"></i><i onclick="openInfo()"class="fas fa-info-circle"></i></div></div></li>`;
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
    alt=""/><div class="book-btns"><p class="price">${data.price}$</p><i data-attribute="${data.asin}" onclick="addToCart(event)" class="fas fa-cart-arrow-down"></i><i onclick="openInfo()"class="fas fa-info-circle"></i></div></div></li>`;
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
  let spinner = document.querySelectorAll(".center");
  let h2 = document.querySelectorAll("h2");
  h2.forEach((element) => {
    element.classList.toggle("d-none");
  });
  spinner.forEach((element) => {
    element.classList.toggle("d-none");
  });
};
const addToCart = (event) => {
  let bookid = event.target.getAttribute("data-attribute");
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
  counterUpdater();
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
    const cartContent = document.querySelector("#cart-content");
    console.log(filter);
    filter.forEach((data) => {
      cartContent.innerHTML += `<img
       
        src="${data.img}" height=250 width="145"
        alt=""/><div class="book-btns"><p class="price">${data.price}$</p><i onclick="openInfo()"class="fas fa-info-circle"></i></div></div></li>`;
    });
  }
};
const counterUpdater = () => {
  const actualCart = localStorage.getItem("cart");

  const array = actualCart.split(",");
  if (array.length === 2 && array[1] === "") array.pop();

  let cartCounter = document.querySelector(".cart-counter");

  console.log(array);
  cartCounter.innerHTML = array.length;
};

const cleaner = async () => {
  localStorage.clear();

  let cartCounter = document.querySelector(".cart-counter");

  cartCounter.innerHTML = "";
};
window.onload = setTimeout(startEngine, 1000);
