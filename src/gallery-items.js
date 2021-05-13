const imgs = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];
//
const galleryContainer = document.querySelector(".js-gallery");
const backDrop = document.querySelector(".lightbox");
const backDropImges = document.querySelector(".lightbox__image");
const backDropOverlay = document.querySelector(".lightbox__overlay");
const modalButtonClose = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const galleryListMarkup = createCardsMarkup(imgs);
//
galleryContainer.insertAdjacentHTML("beforeend", galleryListMarkup);
galleryContainer.addEventListener("click", onGalleryContainerClick);
backDropOverlay.addEventListener("click", onBackDropClick);
modalButtonClose.addEventListener("click", onButtonClose);

function onGalleryContainerClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  event.preventDefault();
  console.log(event.target.dataset.source);
  backDrop.classList.add("is-open");
  backDropImges.src = event.target.dataset.source;
  window.addEventListener("keydown", onEscPress);
  window.addEventListener("keydown", onArrowRightPress);
  window.addEventListener("keydown", onArrowLeftPress);
}

function onButtonClose() {
  backDrop.classList.remove("is-open");
  backDropImges.src = "";
  backDropImges.alt = "";
  window.removeEventListener("keydown", onEscPress);
  window.removeEventListener("keydown", onArrowRightPress);
  window.removeEventListener("keydown", onArrowLeftPress);
  }
function onBackDropClick(event) {
  if (event.currentTarget === event.target) {
    onButtonClose();
  }
}
function onEscPress(event) {
  if (event.code === "Escape") {
    onButtonClose();
  }
}

function onArrowRightPress(event) {
  if (event.code === "ArrowRight") {
    let backDropSrc = backDropImges.src;
    let nextIndex = null;
    imgs.find((img, i) => {
      nextIndex = i;
      if (img.original === backDropSrc && i !== imgs.length - 1) {
        nextIndex = i + 1;
        return true;
      }
    });
    backDropImges.src = imgs[nextIndex].original;
  }
}

function onArrowLeftPress(event) {
  if (event.code === "ArrowLeft") {
    let backDropSrc = backDropImges.src;
    let nextIndex = 0;
    imgs.find((img, i) => {
      if (img.original === backDropSrc && i > 0) {
        nextIndex = i - 1;
        return true;
      }
    });
    backDropImges.src = imgs[nextIndex].original;
  }
}

function createCardsMarkup(imgs) {
  return imgs
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
      </a>
    </li>`;
    })
    .join("");
}
