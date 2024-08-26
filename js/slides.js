new fullpage("#fullpage", {
    autoScrolling: true,
    scrollHorizontally: false,
    navigation: true,
    anchors: ["section1", "section2", "section3", "section4", "section5", "section6"],
    // navigationTooltips: ['Websites', 'Digital Products', 'Development', 'Branding', 'Content', 'Contact'],
    showActiveTooltip: true,
    scrollingSpeed: 700, // Скорость перехода между секциями (мс)
  });


const firstSlide = document.getElementById("slide1"); // Предполагается, что у первого слайда есть id="slide1"
const secondSlide = document.getElementById("slide2");

const blurbg = document.querySelector(".blurbg");

// Функция, которая будет вызываться, когда первый или второй слайд становятся видимыми
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.target === firstSlide && entry.isIntersecting) {
      // Если виден первый слайд, убираем фон
      blurbg.classList.add("blurbg_Out");
      blurbg.classList.remove("blurbg_In");
    } else if (entry.target === secondSlide && entry.isIntersecting) {
      // Если виден второй слайд, добавляем фон
      blurbg.classList.add("blurbg_In");
      blurbg.classList.remove("blurbg_Out");
    }
  });
};

// Настройки для IntersectionObserver
const observerOptions = {
  root: null, // Будет использоваться viewport как корневой элемент
  threshold: 0.5, // 50% элемента должно быть видно, чтобы сработало
};

// Создаем IntersectionObserver
const observer = new IntersectionObserver(
  observerCallback,
  observerOptions
);

// Начинаем наблюдать за первым и вторым слайдами
observer.observe(firstSlide);
observer.observe(secondSlide);