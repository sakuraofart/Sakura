class Writer {
    constructor(node) {
      this.node = node;
      
      if (!this.node) return;
  
      this.timer = 50; // .2s
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