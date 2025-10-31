function initGridLoadingAnimation() {
  const galleries = document.querySelectorAll('.commercialshooting-photo, .pre-wedding-photo, .year1-photo, .courses-photo, .popup-photo');
  
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        animateGalleryFromCenter(entry.target);
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  galleries.forEach(gallery => {
    // 初始化：所有圖片設為隱藏
    const items = gallery.querySelectorAll('.photo-item');
    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.6)';
    });
    
    observer.observe(gallery);
  });
}

function animateGalleryFromCenter(gallery) {
  const items = Array.from(gallery.querySelectorAll('.photo-item'));
  const galleryRect = gallery.getBoundingClientRect();
  const centerX = galleryRect.width / 2;
  const centerY = galleryRect.height / 2;
  
  // 計算每個元素與中心的距離
  const itemsWithDistance = items.map(item => {
    const rect = item.getBoundingClientRect();
    const itemCenterX = rect.left - galleryRect.left + rect.width / 2;
    const itemCenterY = rect.top - galleryRect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(itemCenterX - centerX, 2) + 
      Math.pow(itemCenterY - centerY, 2)
    );
    
    return { item, distance };
  });
  
  // 按距離排序（距離近的先出現）
  itemsWithDistance.sort((a, b) => a.distance - b.distance);
  
  // 依序顯示
  itemsWithDistance.forEach(({item}, index) => {
    setTimeout(() => {
      item.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      item.style.opacity = '1';
      item.style.transform = 'scale(1)';
    }, index * 80);
  });
}


// ==================== Lightbox 圖片放大功能 (820px以下) ====================
function initImageClickExpand() {
  // 創建 Lightbox 結構
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-content">
      <button class="lightbox-close">&times;</button>
      <button class="lightbox-prev">&#8249;</button>
      <button class="lightbox-next">&#8250;</button>
      <img src="" alt="">
    </div>
  `;
  document.body.appendChild(lightbox);
  
  const overlay = lightbox.querySelector('.lightbox-overlay');
  const content = lightbox.querySelector('.lightbox-content');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  const lightboxImg = lightbox.querySelector('img');
  
  let currentIndex = 0;
  let currentGallery = [];
  
  // 開啟 Lightbox
  function openLightbox(gallery, index) {
    // if (window.innerWidth > 1600) return; // 1600px以下啟用
    
    currentGallery = gallery;
    currentIndex = index;
    
    const img = currentGallery[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // 關閉 Lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // 顯示上一張
  function showPrev() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    const img = currentGallery[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }
  
  // 顯示下一張
  function showNext() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    const img = currentGallery[currentIndex].querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }
  
  // 為每個 gallery 區塊的圖片添加點擊事件
  const galleries = document.querySelectorAll('.commercialshooting-photo, .pre-wedding-photo, .year1-photo, .courses-photo, .popup-photo');
  
  galleries.forEach(gallery => {
    const photoItems = Array.from(gallery.querySelectorAll('.photo-item'));
    
    photoItems.forEach((item, index) => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        openLightbox(photoItems, index);
      });
    });
  });
  
  // 事件監聽
  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
  
  // 鍵盤操作
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
  
  // 視窗大小改變時關閉 Lightbox
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820 && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

// ==================== 初始化所有功能 ====================
document.addEventListener('DOMContentLoaded', () => {
  initGridLoadingAnimation();
  initImageClickExpand();
});