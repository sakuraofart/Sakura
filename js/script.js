$(document).ready(function () {
  // Используем событие pageshow
  $(window).on("pageshow", function (event) {
    if (event.originalEvent.persisted) {
      // Скрываем overlay при возврате на страницу из истории
      $(".page-transition-overlay").css("display", "none");
    }
  });

  $(document).on(
    "click",
    'a:not([href*="#section"])',
    function (e) {
      e.preventDefault();
      var href = $(this).attr("href");

      // Показываем overlay
      $(".page-transition-overlay").fadeIn(260, function () {
        // После показа overlay, переходим на новую страницу
        window.location.href = href;
      });
    }
  );
});

let maska = document.querySelector(".mask");
window.addEventListener("load", () => {
  maska.classList.add("hide");
  setTimeout(() => {
    maska.remove();
  }, 300);
});

document.addEventListener("DOMContentLoaded", function () {
  class Writer {
    constructor(node) {
      this.node = node;

      if (!this.node) return;

      this.timer = 45; // .2s
      this.broken = this.node.textContent.split("");

      this._init();
    }

    _init() {
      this.node.textContent = "";
      let i = 0;

      let interval = setInterval(() => {
        this.node.textContent += this.broken[i];

        i++;

        if (i >= this.broken.length) clearInterval(interval);
      }, this.timer);
    }
  }

  const root = document.querySelector(".title");

  new Writer(root);

  /// ANIMATION BACKGROUND VIDEO (main)
  const video = document.getElementById("backgroundVideo");
  const targetElement = document.querySelector(".portfolio__block");
  const mainTitleBlock = document.querySelector(".main-block");
  let videoPlayed = false;
  let videoPaused = false;
  let videoTimeout;
  let videoEnded = false;

  if (video && targetElement) {
    function checkVisibility() {
      const rect = targetElement.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Проверяем, что элемент виден в пределах окна просмотра
      return rect.top <= windowHeight && rect.bottom >= 0;
    }

    function handleScroll() {
      if (videoEnded) return; // Если видео закончилось, не выполняем никаких действий

      if (!videoPlayed) {
        video.play();
        videoPlayed = true;

        // Останавливаем видео через 2 секунды
        videoTimeout = setTimeout(() => {
          video.pause();
          videoPaused = true;
          mainTitleBlock.classList.add("main-block-fadeIn");
        }, 3370);
      }

      // Если видео приостановлено, возобновляем воспроизведение, когда элемент снова видим
      if (videoPaused && checkVisibility()) {
        video.play();
        videoPaused = false;
      }
    }

    // Обрабатываем случай, если видео уже было проиграно и страница загружена
    function handleLoad() {
      if (checkVisibility()) {
        handleScroll();
      }
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleLoad);

    // Обрабатываем случай окончания видео
    video.addEventListener("ended", () => {
      videoPaused = true;
      videoEnded = true;
    });

    video.addEventListener("loadedmetadata", () => {
      const videoLengthToStop = video.duration - 1.014;
      // console.log(videoLengthToStop);

      // Проверяем текущее время воспроизведения видео
      video.addEventListener("timeupdate", () => {
        if (video.currentTime >= 13 && !videoEnded) {
          video.pause();
        }
      });
    });
  }

  /// ANIMATION BACKGROUND VIDEO (about)


  // ---------------------------------------------------------------------------------------------

  // --------------------------------------ShortInfoBlock Script-------------------------------------
  const accordionItems = document.querySelectorAll(".accordion-item button");
  if (accordionItems) {
    accordionItems.forEach((item) => {
      item.addEventListener("click", function () {
        const isActive = this.classList.contains("active");
        closeAllAccordionItems();
        if (!isActive) {
          this.classList.add("active");
        }
      });
    });

    function closeAllAccordionItems() {
      accordionItems.forEach((item) => {
        item.classList.remove("active");
      });
    }
  }

  // ---------------------------------------------------------------------------------------------

  const portfolioItems = document.querySelectorAll(".portfolio__item");

  portfolioItems.forEach((item) => {
    const video = item.querySelector(".videoBGportfolio");

    item.addEventListener("mouseenter", () => {
      if (video) {
        video.play();
      }
    });

    item.addEventListener("mouseleave", () => {
      if (video) {
        video.pause();
        video.currentTime = 0; // Сброс видео на начало
      }
    });
  });





  const menu = document.querySelector(".menu");
  const verticalMenu = document.querySelector(".vertical-menu");
  const menuStartHTML = menu.innerHTML;
  const header = document.querySelector("header");
  
  const menuBurgerHTML =
    "<img class='menu-burger' style='margin-top: 12px' width='20px' src='./images/AllAssets/hamburger.png'>";
  const closeCrossHTML =
    "<img class='menu-close' style='margin-top: 12px' width='18px' src='./images/AllAssets/Crossclose.png'>";
  
  // Функция для обновления меню в зависимости от ширины экрана
  function updateMenu() {
    // Проверка текущей ширины экрана
    if (window.innerWidth < 950) {
      menu.innerHTML = menuBurgerHTML;
      menu.style.marginTop = "0px";
  
      // Убедимся, что обработчик клика не добавляется несколько раз
      if (!menu.dataset.clickHandlerAdded) {
        menu.addEventListener("click", toggleMenu);
        menu.dataset.clickHandlerAdded = "true"; // Устанавливаем флаг
      }
    } else {
      menu.style.marginTop = "5px";
      menu.innerHTML = menuStartHTML;
  
      // Удаляем обработчик клика, если он был добавлен
      if (menu.dataset.clickHandlerAdded) {
        menu.removeEventListener("click", toggleMenu);
        delete menu.dataset.clickHandlerAdded; // Удаляем флаг
      }
    }
  }
  
  // Функция для переключения меню
  function toggleMenu() {
    if (header.classList.contains("closed")) {
      header.classList.remove("closed");
      header.classList.add("opened");
      verticalMenu.classList.add("menuIsOpen");
      verticalMenu.classList.remove("menuIsClose");
      disableScroll();
      menu.innerHTML = closeCrossHTML;
    } else {
      header.classList.remove("opened");
      header.classList.add("closed");
      verticalMenu.classList.remove("menuIsOpen");
      verticalMenu.classList.add("menuIsClose");
      enableScroll();
      menu.innerHTML = menuBurgerHTML;
    }
  }
  
  // Функции для блокировки и разблокировки прокрутки
  function disableScroll() {
    document.body.style.overflow = "hidden";
  }
  
  function enableScroll() {
    document.body.style.overflow = "";
  }
  
  // Инициализация меню при загрузке страницы
  updateMenu();
  
  // Обработчик события resize для обновления меню при изменении размера окна
  window.addEventListener("resize", updateMenu);
  
  // --------------------------------- Start Portfolio Mobile Animation---------------------------------
  if (window.innerWidth < 900) {
    const items = document.querySelectorAll(".portfolio__item");
    let index = 0;

    items.forEach((e) => {
      e.addEventListener("click", () => {
        e.classList.add("activated");
      });
    });

    // items.forEach((element) => {
    //   if (!element.matches(':hover')) {
    //     console.log("dwddw")
    //   }
    // })

    // setInterval(() => {
    //   for (var i = 0; i < items.length; i++) {
    //       if (!items[i].matches(':hover')) {
    //         console.log("no in ", i)
    //       }

    //   }
    // }, 3500)

    const target = document.querySelector(".portfolio");

    function checkScroll() {
      if (target) {
        const targetOffsetTop = target.offsetTop;
        const windowScrollTop = window.scrollY;
        const windowHeight = window.innerHeight;

        // Проверяем, виден ли элемент

        if (
          targetOffsetTop < windowScrollTop + windowHeight &&
          targetOffsetTop + target.offsetHeight > windowScrollTop
        ) {
          console.log("Блок портфолио виден");

          function triggerAnimation() {
            // Убираем предыдущий активный класс, если это не первый элемент
            if (index > 0) {
              const prevVideo =
                items[index - 1].querySelector(".videoBGportfolio");
              items[index - 1].classList.remove("hover");
              if (prevVideo) {
                prevVideo.pause(); // Останавливаем предыдущее видео
              }
            }

            // Добавляем активный класс для текущего элемента
            const currentItem = items[index];
            const currentVideo = currentItem.querySelector(".videoBGportfolio");
            currentItem.classList.add("hover");

            if (currentVideo) {
              currentVideo.currentTime = 0; // Сбрасываем видео к началу
              currentVideo.play(); // Воспроизводим видео
            }

            // Увеличиваем индекс
            index++;

            // Проверяем, достигли ли мы конца списка элементов
            if (index < items.length) {
              // Если нет, запускаем анимацию для следующего блока через 3 секунды
              setTimeout(triggerAnimation, 6250);
            } else {
              // Если да, то сбрасываем анимацию и начинаем заново через 3 секунды
              setTimeout(() => {
                const lastVideo =
                  items[items.length - 1].querySelector(".videoBGportfolio");
                items[items.length - 1].classList.remove("hover");
                if (lastVideo) {
                  lastVideo.pause(); // Останавливаем последнее видео
                }
                index = 0; // Сбрасываем индекс
                triggerAnimation(); // Запускаем цикл заново
              }, 3000);
            }
          }
          setTimeout(() => {
            triggerAnimation();
          }, 1000);
          window.removeEventListener("scroll", checkScroll);
        }
      }
    }

    window.addEventListener("scroll", checkScroll);

    // setTimeout(

    // }, 5000);

    // Запускаем цикл анимации
    // setTimeout(  triggerAnimation(), 7000)
  }

  // --------------------------------- END Portfolio Mobile Animation---------------------------------
});

// --------------------------------- START About Numbers Animation---------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const numberElements = document.querySelectorAll(".about__block-nmb");

  numberElements.forEach((el) => {
    const textContent = el.textContent.trim();
    // Проверяем, является ли содержимое числом
    const maxNumber = parseInt(textContent.replace(/\D/g, ""));
    if (!isNaN(maxNumber)) {
      animateNumber(el, 0, maxNumber, 2000); // 2000 - длительность анимации в мс
    }
  });

  function animateNumber(element, start, end, duration) {
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const progress = currentTime - startTime;
      const value = Math.min(
        Math.floor((progress / duration) * (end - start) + start),
        end
      );
      element.textContent = value + (end === 80 ? "+" : ""); // Добавляем '+' к 80
      if (progress < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }
});
// --------------------------------- END About Numbers Animation---------------------------------

