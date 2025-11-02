
$(function () {

  let startStudio = 'studio1';
  let currentTimer = null; // 全域計時器


  setTimeout(function(){
    const hash = window.location.hash;
    if (hash) {
      const target = hash.substring(1);
      if ($(`#${target}`).length) {
        startStudio = target;
        // 立即切換
        $('.studio-content').removeClass('active');
        $('.dot').removeClass('active');
        $(`#${startStudio}`).addClass('active');
        $(`.dot[data-studio="${startStudio}"]`).addClass('active');
        setupSlider(startStudio);

        // scroll
        $('html, body').animate({
          scrollTop: $(`#${startStudio}`).offset().top - 100
        }, 600);
      }
    } else {
      $(`#studio1`).addClass('active');
      $(`.dot[data-studio="studio1"]`).addClass('active');
      setupSlider('studio1');
    }
  }, 100);

  // ============ 圓點切換功能 ============
  $('.dot').click(function () {
    let targetStudio = $(this).data('studio');

    // 清除舊的計時器
    if (currentTimer) {
      clearInterval(currentTimer);
      currentTimer = null;
    }

    // 更新所有頁面的 active
    $('.dot').removeClass('active');
    $(`.dot[data-studio="${targetStudio}"]`).addClass('active');

    // change content
    $('.studio-content').removeClass('active');
    $(`#${targetStudio}`).addClass('active');

    // initialize 
    setupSlider(targetStudio);
  });

  // ============ 輪播初始化函數（支援 RWD）============
  function setupSlider(studioId) {
    let $studio = $(`#${studioId}`);
    let $sliderBoard = $studio.find('.sliderBoard');
    let $content = $studio.find('.content');
    let $prevBtn = $studio.find('.prevButton');
    let $nextBtn = $studio.find('.nextButton');
    
    let imgCount = $content.find('li').length;
    let index = 0;
    
    // 清除舊的計時器
    if (currentTimer) {
      clearInterval(currentTimer);
      currentTimer = null;
    }
    
    // update width (RWD use)
    function updateWidths() {
      let divWidth = $sliderBoard.width();
      $content.find('li').width(divWidth);
      $content.width(divWidth * imgCount);
      $content.css('left', divWidth * index * -1);
    }
    
    updateWidths();
    
    // 
    let resizeTimer;
    $(window).off('resize.slider').on('resize.slider', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateWidths, 100);
    });
    
    //
    $prevBtn.off('click');
    $nextBtn.off('click');
    
    // 
    function moveTo(targetIndex) {
      let divWidth = $sliderBoard.width();
      $content.animate({
        left: divWidth * targetIndex * -1
      }, 500);
    }
    
    // next one
    function moveToNext() {
      if (index < imgCount - 1) {
        index++;
      } else {
        index = 0;
      }
      moveTo(index);
    }
    
    // 
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
    
    // 
    $nextBtn.click(function () {
      if (currentTimer) clearInterval(currentTimer);
      moveToNext();
      currentTimer = setInterval(moveToNext, 5000);
    });
    
    // 
    currentTimer = setInterval(moveToNext, 5000);
  }

  // ============ 注意事項 function ============
  let wrapper = $('.notice-panel-wrapper');
  let panel = $('.notice-panel');
  let openButton = $('.article-title a');
  let closeButton = $('#closeButton');

  // open
  openButton.click(function(e){
    e.preventDefault();
    e.stopPropagation();
    openNotice();
  });

  // close click outside
  $(document).on('click', function(e){
    if (wrapper.hasClass('show')){
      if (!$(e.target).closest('.notice-panel').length && 
          !$(e.target).closest('.article-title a').length) {
        closeNotice();
      }
    }
  });

  // close click
  closeButton.click(function(){
    closeNotice();
  });

  // close(ESC)
  $(document).keydown(function (e) {
    if (e.key === 'Escape' && wrapper.hasClass('show')) {
      closeNotice();
    }
  });  

  // open
  function openNotice() {
    wrapper.addClass('show');
    setTimeout(function() {
      panel.css('transform', 'translateX(0)');
    }, 10);
  }

  // close 
  function closeNotice() {
    panel.css('transform', 'translateX(100%)');
    setTimeout(function(){
      wrapper.removeClass('show');
    }, 300);
  }

});



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