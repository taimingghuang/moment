$(function () {

  let startStudio = 'studio1';
  let currentTimer = null; // 準備一個計時器var，之後用來控制輪播自動播放

  setTimeout(function(){
    const hash = window.location.hash;
    if (hash) {
      const target = hash.substring(1); // "studio2"
      if ($(`#${target}`).length) {
        startStudio = target;
      // 立即切換
        $('.studio-content').removeClass('active');
        $('.dot').removeClass('active');
        $(`#${startStudio}`).addClass('active');
        $(`.dot[data-studio="${startStudio}"]`).addClass('active');
        setupSlider(startStudio);

        // 平滑滾動
        $('html, body').animate({
          scrollTop: $(`#${startStudio}`).offset().top - 100
        }, 600);
      }
    } else {
      // 預設第一頁
      $(`#studio1`).addClass('active');
      $(`.dot[data-studio="studio1"]`).addClass('active');
      setupSlider('studio1');
    }
  }, 100);

  // 圓點切換功能
  $('.dot').click(function () {

    let targetStudio = $(this).data('studio');

    // 清除舊的計時器
    if (currentTimer) {
      clearInterval(currentTimer);
    }

    // 1. 更新所有頁面的 active
    $('.dot').removeClass('active');
    $(`.dot[data-studio="${targetStudio}"]`).addClass('active');

    // 切換內容
    $('.studio-content').removeClass('active');
    $(`#${targetStudio}`).addClass('active');

    // 初始化該攝影棚的輪播
    setupSlider(targetStudio);

      
  });



  // // === 預設啟動 studio1 ===
  // setupSlider('studio1');

  // 輪播初始化函數
  function setupSlider(studioId) {
    let $studio = $(`#${studioId}`);
    let $sliderBoard = $studio.find('.sliderBoard');
    let $content = $studio.find('.content');
    let $prevBtn = $studio.find('.prevButton');
    let $nextBtn = $studio.find('.nextButton');

    let divWidth = $sliderBoard.width();
    let imgCount = $content.find('li').length;

    // 設定寬度
    $content.find('li').width(divWidth);
    $content.width(divWidth * imgCount);
    $content.css('left', '0'); // 重置位置

    let index = 0;

    // 清除舊的事件綁定
    $prevBtn.off('click');
    $nextBtn.off('click');

    // 左箭頭點擊
    $prevBtn.click(function () {
      if (currentTimer) clearInterval(currentTimer);

      if (index > 0) {
        index--;
      } else {
        index = imgCount - 1;
      }
      moveTo(index);

      currentTimer = setInterval(moveToNext, 5000);
    });

    // 右箭頭點擊
    $nextBtn.click(function () {
      if (currentTimer) clearInterval(currentTimer);
      moveToNext();
      currentTimer = setInterval(moveToNext, 5000);
    });

    // 移動到指定位置
    function moveTo(targetIndex) {
      $content.animate({
        left: divWidth * targetIndex * -1
      }, 500);
    }

    // 移動到下一張
    function moveToNext() {
      if (index < imgCount - 1) {
        index++;
      } else {
        index = 0;
      }
      moveTo(index);
    }

    if (currentTimer) clearInterval(currentTimer);
    currentTimer = setInterval(moveToNext, 5000);
  }
});

// ============ 注意事項彈窗功能 ============
$(function(){
  let wrapper = $(`.notice-panel-wrapper`)
  let panel = $(`.notice-panel`)
  let openButton = $(`.article-title a`)
  let closeButton = $(`#closeButton`)

  // open window
  openButton.click(function(e){
    e.preventDefault();
    e.stopPropagation();
    openNotice();
  });

  // close window
  // 1. 點外部
  $(document).on('click', function(e){
    if (wrapper.hasClass('show')){
      if (!$(e.target).closest('.notice-panel').length) {
          closeNotice();
      }
    }
  })
  // 2. 
  closeButton.click(function(){
    closeNotice();
  });

  // 3.
  $(document).keydown(function (e) {
    if (e.key === 'Escape' && wrapper.hasClass('show')) {
      closeNotice();
    }
  });  

  // === 開啟函數 ===
  function openNotice() {
    wrapper.addClass('show');
    setTimeout(function() {
      panel.css('transform', 'translateX(0)');
    }, 10);
  }
  // === 關閉函數 ===
  function closeNotice() {
    panel.css('transform', 'translateX(100%)');
    setTimeout(function(){
      wrapper.removeClass('show');
    }, 300);
  }
})



// $(function() {
//   // 點擊「注意事項」按鈕
//   $('.article-title a').click(function(e) {
//     e.preventDefault(); // 阻止預設的 # 跳轉
//     $('.notice-panel-wrapper').addClass('show');
//   });

//   // 點擊彈窗外部區域關閉
//   $('.notice-panel-wrapper').click(function(e) {
//     if ($(e.target).is('.notice-panel-wrapper')) {
//       $(this).removeClass('show');
//     }
//   });

//   // 按 ESC 鍵關閉
//   $(document).keydown(function(e) {
//     if (e.key === 'Escape') {
//       $('.notice-panel-wrapper').removeClass('show');
//     }
//   });
// });


// $(function () {
//     // 圓點切換功能
//     $('.dot').click(function () {
//       let targetStudio = $(this).data('studio');

//     let divWidth = $('#sliderBoard').width()
//     let imgCount = $('#content li').length

//     // 切換 active class
//     $('.dot').removeClass('active');
//     $(this).addClass('active');

//     // 切換內容顯示
//     $('.studio-content').removeClass('active');
//     $(`#${targetStudio}`).addClass('active');
//     })
    
//     for(let i = 0; i < imgCount; i++){
//         $('#contentButton').append(`<li></li>`)
//     }
//     $('#contentButton li:first').addClass('clicked')
    
//     $('#content li').width(divWidth)    // li 的寬度
//     $('#content').width(divWidth * imgCount)    // ul 的寬度
    
//     let index = 0
//     let timer = setInterval(moveToNext, 5000)

//     $('#contentButton li').click(function(){
//         clearInterval(timer)    // 停掉計時器

//         index = $(this).index()
//         // alert(index)

//         $('#content').animate({
//             left: divWidth * index * -1,
//         })

//         $(this).addClass('clicked')
//         $('#contentButton li').not(this).removeClass('clicked')

//         timer = setInterval(moveToNext, 5000)  // 重置計時器
//     })

//     function moveToNext(){
//         // index 要控制在 0 ~ 7 之間
//         if(index < imgCount - 1){
//             index++
//         }else{
//             index = 0
//         }

//         $('#content').animate({
//             left: divWidth * index * -1,
//         })

//         $(`#contentButton li:eq(${index})`).addClass('clicked')
//         $('#contentButton li').not(`:eq(${index})`).removeClass('clicked')
//     }
// });