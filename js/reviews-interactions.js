function initReviewsLightbox() {
  // 檢查是否已經創建過 Lightbox
  if (document.querySelector('.reviews-lightbox')) {
    return;
  }

  // 創建 Reviews 專用 Lightbox 結構
  const lightbox = document.createElement('div');
  lightbox.className = 'reviews-lightbox';
  lightbox.innerHTML = `
    <div class="reviews-lightbox-overlay"></div>
    <div class="reviews-lightbox-container">
      <button class="reviews-lightbox-close">&times;</button>
      <button class="reviews-lightbox-prev">&#8249;</button>
      <button class="reviews-lightbox-next">&#8250;</button>
      
      <div class="reviews-lightbox-content">
        <div class="reviews-lightbox-image-wrapper">
          <img src="" alt="客戶評論">
        </div>
        <div class="reviews-lightbox-text">
          <div class="reviews-lightbox-stars">
            ⭐⭐⭐⭐⭐
          </div>
          <p class="reviews-lightbox-review"></p>
          <span class="reviews-lightbox-counter"></span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);
  
  const overlay = lightbox.querySelector('.reviews-lightbox-overlay');
  const container = lightbox.querySelector('.reviews-lightbox-container');
  const closeBtn = lightbox.querySelector('.reviews-lightbox-close');
  const prevBtn = lightbox.querySelector('.reviews-lightbox-prev');
  const nextBtn = lightbox.querySelector('.reviews-lightbox-next');
  const lightboxImg = lightbox.querySelector('img');
  const reviewText = lightbox.querySelector('.reviews-lightbox-review');
  const counter = lightbox.querySelector('.reviews-lightbox-counter');
  
  let currentIndex = 0;
  let reviewsData = [];
  
  // 收集所有評論數據
  function collectReviewsData() {
    const section = document.querySelector('.reviews-section');
    if (!section) return [];
    
    const data = [];
    const children = Array.from(section.children);
    
    // 按照 HTML 順序配對 (h3 + span)
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      
      if (element.tagName === 'H3') {
        const text = element.textContent.trim();
        const nextElement = children[i + 1];
        
        if (nextElement && nextElement.tagName === 'SPAN') {
          const img = nextElement.querySelector('img');
          if (img) {
            data.push({
              text: text,
              image: img.src,
              alt: img.alt || '客戶評論'
            });
          }
        }
      } else if (element.tagName === 'SPAN') {
        const img = element.querySelector('img');
        const prevElement = children[i - 1];
        
        // 如果前一個不是 h3，這是單獨的圖片
        if (img && (!prevElement || prevElement.tagName !== 'H3')) {
          data.push({
            text: '客戶分享的美好瞬間 ✨',
            image: img.src,
            alt: img.alt || '客戶評論'
          });
        }
      }
    }
    
    return data;
  }
  
  // 開啟 Lightbox
  function openLightbox(index) {
    reviewsData = collectReviewsData();
    if (reviewsData.length === 0) return;
    
    currentIndex = index;
    updateContent();
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 淡入動畫
    setTimeout(() => {
      container.style.opacity = '1';
      container.style.transform = 'scale(1)';
    }, 10);
  }
  
  // 關閉 Lightbox
  function closeLightbox() {
    container.style.opacity = '0';
    container.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }, 300);
  }
  
  // 更新內容
  function updateContent() {
    const review = reviewsData[currentIndex];
    if (!review) return;
    
    lightboxImg.src = review.image;
    lightboxImg.alt = review.alt;
    reviewText.textContent = review.text;
    counter.textContent = `${currentIndex + 1} / ${reviewsData.length}`;
    
    // 圖片淡入效果
    lightboxImg.style.opacity = '0';
    lightboxImg.onload = () => {
      lightboxImg.style.transition = 'opacity 0.3s ease';
      lightboxImg.style.opacity = '1';
    };
  }
  
  // 上一張
  function showPrev() {
    currentIndex = (currentIndex - 1 + reviewsData.length) % reviewsData.length;
    updateContent();
  }
  
  // 下一張
  function showNext() {
    currentIndex = (currentIndex + 1) % reviewsData.length;
    updateContent();
  }
  
  // 為所有圖片添加點擊事件
  function bindClickEvents() {
    const section = document.querySelector('.reviews-section');
    if (!section) return;
    
    const spans = section.querySelectorAll('span');
    spans.forEach((span, index) => {
      const img = span.querySelector('img');
      if (img) {
        span.style.cursor = 'pointer';
        span.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openLightbox(index);
        });
        
        // Hover 效果
        span.addEventListener('mouseenter', () => {
          span.style.transform = 'scale(1.02)';
          span.style.transition = 'transform 0.3s ease';
        });
        span.addEventListener('mouseleave', () => {
          span.style.transform = 'scale(1)';
        });
      }
    });
  }
  
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
  
  // 觸控滑動支援 (手機)
  let touchStartX = 0;
  let touchEndX = 0;
  
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      showNext(); // 向左滑
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      showPrev(); // 向右滑
    }
  }
  
  // 初始化點擊事件
  bindClickEvents();
  
  // 當內容動態載入時重新綁定
  const observer = new MutationObserver(() => {
    bindClickEvents();
  });
  
  const section = document.querySelector('.reviews-section');
  if (section) {
    observer.observe(section, { childList: true, subtree: true });
  }
}

// ==================== 初始化所有功能 ====================
document.addEventListener('DOMContentLoaded', () => {
  // 延遲初始化，確保 DOM 完全載入
  setTimeout(() => {
    initReviewsLightbox();
    initReviewsGridAnimation();  // 新增這行
    initReviewsHeaderAnimation();
  }, 100);
});

// 如果頁面已經載入完成（用於動態載入的情況）
if (document.readyState === 'complete') {
  initReviewsLightbox();
  initReviewsGridAnimation();  // 新增這行
  initReviewsHeaderAnimation(); 
}


// ==================== 瀑布流載入動畫（從中心往外擴散）====================

function initReviewsGridAnimation() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        if (entry.target.classList.contains('welcome')) {
          // P1 數據卡片動畫
          animateStatsFromCenter(entry.target);
        } else if (entry.target.classList.contains('reviews-section')) {
          // P2 評論區動畫
          animateReviewsFromCenter(entry.target);
        } else if (entry.target.classList.contains('reviews-p3')) {
          // P3 底部區塊簡單淡入
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(30px)';
          setTimeout(() => {
            entry.target.style.transition = 'all 0.8s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 100);
        }
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);

  // 觀察所有需要動畫的區塊
  const elementsToObserve = [
    document.querySelector('.welcome'),
    document.querySelector('.reviews-section'),
    document.querySelector('.reviews-p3')
  ].filter(el => el !== null);

  elementsToObserve.forEach(element => {
    observer.observe(element);
  });
}

// P1 數據卡片：從中心往外擴散
function animateStatsFromCenter(container) {
  const items = Array.from(container.querySelectorAll('li'));
  const containerRect = container.getBoundingClientRect();
  const centerX = containerRect.width / 2;
  const centerY = containerRect.height / 2;
  
  // 初始化：所有卡片隱藏
  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.6)';
  });
  
  // 計算每個元素與中心的距離
  const itemsWithDistance = items.map(item => {
    const rect = item.getBoundingClientRect();
    const itemCenterX = rect.left - containerRect.left + rect.width / 2;
    const itemCenterY = rect.top - containerRect.top + rect.height / 2;
    
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
      item.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      item.style.opacity = '1';
      item.style.transform = 'scale(1)';
    }, index * 150);
  });
}

// P2 評論區：交錯瀑布流
function animateReviewsFromCenter(container) {
  const items = Array.from(container.children);
  
  // 初始化：所有元素隱藏
  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
  });
  
  // 依序顯示（左右交錯）
  items.forEach((item, index) => {
    setTimeout(() => {
      item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, index * 120);
  });
}

// 初始化標題動畫
function initReviewsHeaderAnimation() {
  const header = document.querySelector('.reviews-top');
  if (!header) return;
  
  header.style.opacity = '0';
  header.style.transform = 'translateY(-20px)';
  
  setTimeout(() => {
    header.style.transition = 'all 0.8s ease';
    header.style.opacity = '1';
    header.style.transform = 'translateY(0)';
  }, 200);
}