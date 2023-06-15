//считаем ширину экрана, чтобы метеорит пролетал от края до края

function calculateScreenWidth() {
  const fullScreenDiv = document.getElementById("meteorite-container");
  const rect = fullScreenDiv.getBoundingClientRect();
  console.log('rect метеорита ', rect);
  const rightPosition = rect.right;
  const leftPosition = rect.left;
  const screenWidth = (rightPosition - leftPosition).toFixed(0);
  return screenWidth;
}

let screenWidth = calculateScreenWidth();
//console.log('ширина экрана: ' + screenWidth);

//НОВАЯ ФУНКЦИЯ АНИМАЦИИ МЕТЕОРИТОВ

function rockAnimation(meteoriteDiv) {
  const image = meteoriteDiv
  let position = screenWidth;
  image.style.left = position + "px";

  //расчитать ширину изображения метеорита
  const rect = image.getBoundingClientRect();
  const rightPosition = rect.right;
  const leftPosition = rect.left;
  const imageWidth = (rightPosition - leftPosition).toFixed(0);
  //console.log('ширина метеорита: ' + imageWidth)

  //создаем рандомное число для скорости метеорита
  function generateRandomSpeed(min, max) {
    // Генерируем случайное число от min до max (включительно)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    return randomNumber;
  }

  const randomSpeed = generateRandomSpeed(2, 15)

  // создать анимацию
  let movementRate = null;
  movementRate = setInterval(frame, randomSpeed);

  function frame() {
    if (position < -(Number(screenWidth) + Number(imageWidth)))
      position = screenWidth;

    position--;
    image.style.left = position + "px";
  }
}

//НОВЫЙ БЛОК**************************************************************************

//создание рандомного числа метеоритов
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomNumberOfMeteorites = generateRandomNumber(4, 10);
console.log('случайное число метеоритов', randomNumberOfMeteorites)

const meteoriteContainer = document.getElementById('meteorite-container');

// Create the specified number of div elements and append them to 'meteorite-container'
for (let i = 0; i < randomNumberOfMeteorites; i++) {
  const div = document.createElement('div');
  div.classList.add('meteorite-div');
  div.classList.add('threat');
  meteoriteContainer.appendChild(div);

  //добавляем в див метеорита картинку
  const img = document.createElement('img');
  img.src = 'media/rock1.png';
  img.classList.add('meteorite-img');
  div.appendChild(img);

  //Приписываем диву рандомное положение по высоте
  const screenHeight = window.innerHeight;
  const randomPosition = Math.floor(Math.random() * screenHeight);
  div.style.top = randomPosition + 'px';

  //применяем функцию анимации
  rockAnimation(div)
}