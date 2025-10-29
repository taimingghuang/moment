function initHeader() {
  console.log('initHeader 被呼叫了');
  
  // hamburger
  const menu = document.querySelector('.menu');
  const hamburgerMenu = document.querySelector('.menu ul'); // 漢堡選單's ul
  
  // cart
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



// jQuery寫法:
// function initHeader {
//   console.log(`被呼叫了`)

//   // 設定變數
//   let $menu = $('.menu')
//   let $hamburgerMenu = $('.menu ul')

//   let $cartIcon = $('.cart-icon')
//   let $cartPanel = $('.cart-panel-wrapper') 
//   let $closeBtn = $('.cart-close-btn')

//   // 先檢查
//   if ($cartIcon.lenth === 0 || $cartPanel.length === 0 || $closeBtn === 0 ){
//     return;
//   }

//   // 事件處理 
//   // 漢堡選單點擊
//   // jQuery 的 .on('click', ...) 和 .click(...) 已經自動處理了 this 的問題
//   $menu.on('click', function(e) {
//     e.stopPropagation();
//     $(this).toggleClass('active'); // 使用 $(this) 操作當前被點擊的元素
//     // 關閉購物車
//     $cartPanel.removeClass('active');
//   });

//   // 購物車圖示點擊
//   $cartIcon.on('click', function(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     $cartPanel.toggleClass('active');
//     // 關閉漢堡選單
//     $menu.removeClass('active');
//     console.log('購物車被點擊');
//   });

//   // 關閉按鈕
//   $closeBtn.on('click', function(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     $cartPanel.removeClass('active');
//   });

//   // 點擊購物車面板內部時不關閉
//   $cartPanel.on('click', function(e) {
//     e.stopPropagation();
//   });

//   // 點擊外部關閉購物車和漢堡選單 (document 點擊)
//   $(document).on('click', function(e) {
//     // .is() 檢查 e.target 是否是 $cartIcon 或 $cartPanel
//     // .has() 檢查 e.target 是否為 $cartIcon 或 $cartPanel 的子元素
//     if (!$(e.target).closest($cartIcon).length && !$(e.target).closest($cartPanel).length) {
//        $cartPanel.removeClass('active');
//     }
    
//     // 檢查點擊是否在 $menu 內部
//     if (!$menu.has(e.target).length && !$menu.is(e.target)) {
//       $menu.removeClass('active');
//     }
//   });

//   // ESC 鍵關閉 (document 監聽 keydown)
//   $(document).on('keydown', function(e) {
//     if (e.key === 'Escape') {
//       $cartPanel.removeClass('active');
//       $menu.removeClass('active');
//     }
//   });
// }