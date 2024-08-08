class Writer {
    constructor(node) {
      this.node = node;
      
      if (!this.node) return;
  
      this.timer = 52; // .2s
      this.broken = this.node.textContent.split('');
  
      this._init();
    }
  
    _init() {
      this.node.textContent = '';
      let i = 0;
  
      let interval = setInterval(() => {
        this.node.textContent += this.broken[i];
  
        i++;
  
        if (i >= this.broken.length) clearInterval(interval);
      }, this.timer);
    }
  }
  
  const root = document.querySelector('.title');
  
  new Writer(root);


//ANIMATION BACKGROUND VIDEO
  const video = document.getElementById('backgroundVideo');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Скроллим вниз
            video.play();
        } else {
            // Скроллим вверх
            video.currentTime -= 0.001; // Уменьшаем время на 0.1 секунды
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Для мобильных устройств или если скроллим вверх
    });

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

    function disableScroll() {
      document.body.style.overflow = 'hidden';
    }
    
    // Для разблокировки прокрутки
    function enableScroll() {
      document.body.style.overflow = '';
    }
    
    const menu = document.querySelector(".menu");


    if ( window.innerWidth < 850) {
      const verticalMenu = document.querySelector(".vertical-menu");
      menuBurgerHTML = "<img class='menu-burger' style='margin-top: 12px' width='20px' src='./images/AllAssets/hamburger.png'>"
      menu.innerHTML = menuBurgerHTML;
      closeCrossHTML = "<img class='menu-close' style='margin-top: 12px' width='18px' src='./images/AllAssets/Crossclose.png'>"
      const burger = document.querySelector('.menu-burger');
      menu.addEventListener("click", function toggleMenu() {
        const header = document.querySelector('header');
        if (header.classList.contains("opened")) {
          header.classList.remove("opened");
          header.classList.add("closed");
          verticalMenu.classList.remove("menuIsOpen")
          verticalMenu.classList.add("menuIsClose")
          enableScroll()
          
          menu.innerHTML = menuBurgerHTML
        } else {
          header.classList.remove("closed");
          header.classList.add("opened");
          verticalMenu.classList.add("menuIsOpen")
          verticalMenu.classList.remove("menuIsClose")
          disableScroll()

          menu.innerHTML = closeCrossHTML
        }
      });
    
    } else {
      menu.style.marginTop = "7px"
    }