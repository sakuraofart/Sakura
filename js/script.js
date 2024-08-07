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