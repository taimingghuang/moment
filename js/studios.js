$(function () {
  let currentTimer = null;

  // 圓點切換功能
  $('.dot').click(function () {
    let targetStudio = $(this).data('studio');

    // 清除舊的計時器
    if (currentTimer) {
      clearInterval(currentTimer);
    }

    // 切換 active class
    $('.dot').removeClass('active');
    $(this).addClass('active');

    // 切換內容顯示
    $('.studio-content').removeClass('active');
    $(`#${targetStudio}`).addClass('active');

    // 初始化該攝影棚的輪播
    initSlider(targetStudio);
  });

  // 初始化第一個攝影棚
  initSlider('studio1');

  // 輪播初始化函數
  function initSlider(studioId) {
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

    // 開始自動輪播
    if (currentTimer) clearInterval(currentTimer);
    currentTimer = setInterval(moveToNext, 5000);
  }
});


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