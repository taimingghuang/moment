function initHeader() {
  console.log('initHeader 被呼叫了');
  
  // 漢堡選單
  const menu = document.querySelector('.menu');
  const hamburgerMenu = document.querySelector('.menu ul'); // 漢堡選單的 ul
  
  // 購物車
  const cartIcon = document.querySelector('.cart-icon');
  const cartPanel = document.querySelector('.cart-panel-wrapper');
  const closeBtn = document.querySelector('.cart-close-btn');
  
  if (!cartIcon || !cartPanel || !closeBtn) {
    console.log('找不到購物車元素');
    return;
  }
  
  // 漢堡選單點擊
  if (menu) {
    menu.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      // 關閉購物車
      cartPanel.classList.remove('active');
    });
  }
  
  // 購物車圖示點擊
  cartIcon.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    cartPanel.classList.toggle('active');
    // 關閉漢堡選單
    if (menu) {
      menu.classList.remove('active');
    }
    console.log('購物車被點擊');
  });
  
  // 關閉按鈕
  closeBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    cartPanel.classList.remove('active');
  });
  
  // 點擊購物車面板內部時不關閉
  cartPanel.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  // 點擊外部關閉購物車和漢堡選單
  document.addEventListener('click', function(e) {
    if (!cartIcon.contains(e.target) && !cartPanel.contains(e.target)) {
      cartPanel.classList.remove('active');
    }
    if (menu && !menu.contains(e.target)) {
      menu.classList.remove('active');
    }
  });
  
  // ESC 鍵關閉
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      cartPanel.classList.remove('active');
      if (menu) {
        menu.classList.remove('active');
      }
    }
  });
}