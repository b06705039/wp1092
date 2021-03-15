'strict mode';

imageArray = [
  'https://i1.sndcdn.com/avatars-000199950241-oreyo5-t500x500.jpg',
  'https://i.imgflip.com/3b4mm7.png',
  'https://i.kym-cdn.com/photos/images/original/001/491/989/f3a.jpg',
  'https://i.redd.it/n0p8z4ni0euz.jpg',
  'https://thedogdigest.com/wp-content/uploads/2019/01/Fat-Dog-Meme-We-call-her-Kim-Corgdashian....jpeg.webp',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfZ-9S2gqwAGfbhj7OZzmOFGoZxlepTr5fAw&usqp=CAU',
  'https://yt3.ggpht.com/ytc/AAUvwnjXcFy-nMnZ1uJTmbLqyzOi0N1g5ouA-RlGoLwe=s900-c-k-c0x00ffffff-no-rj',
];

imageAlt = [
  'baby corggo',
  'doge',
  'sad retriever',
  'floof husky',
  'kim corgdashian',
  'tired puggo',
  'coding for 10 straight hours',
];

let index = 3;

// add <img> element under image-viewer__display
const imageElement = document.createElement('img');
const displaySourceWrapper = document.querySelector(
  '.image-viewer__display-source-wrapper'
);
const display = document.querySelector('.image-viewer__display');
const insertedImageElement = display.insertBefore(
  imageElement,
  displaySourceWrapper
);

// default attributes of <img>
insertedImageElement.width = 300;
insertedImageElement.style.margin = '2rem';
insertedImageElement.src = imageArray[index];
insertedImageElement.alt = imageAlt[index];

// adjust display-source-wrapper
document.querySelector('.link').href = imageArray[index];
document.querySelector('.link').textContent = imageArray[index];

// refresh index of image and link each click
const indexRefresher = function () {
  insertedImageElement.src = imageArray[index];
  insertedImageElement.alt = imageAlt[index];
  document.querySelector('.link').href = imageArray[index];
  document.querySelector('.link').textContent = imageArray[index];
};

const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const moveLeft = function () {
  index--;
  if (index === 0) {
    previous.className = 'disabled'; // alternate sol: .classList.add('disabled', 'more classes', ...);
    indexRefresher();
  } else if (index === -1) {
    index++;
  } else {
    previous.className = ''; // alternate sol: .classList.remove('disabled', 'more classes', ...);
    next.className = '';
    indexRefresher();
  }
};
const moveRight = function () {
  index++;
  if (index === imageArray.length - 1) {
    next.className = 'disabled';
    indexRefresher();
  } else if (index === imageArray.length) {
    index--;
  } else {
    next.className = '';
    previous.className = '';
    indexRefresher();
  }
};

// left click
previous.addEventListener('click', moveLeft);

// right click
next.addEventListener('click', moveRight);

// left/right arrow keys
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    moveLeft();
  } else if (e.key === 'ArrowRight') {
    moveRight();
  }
});
