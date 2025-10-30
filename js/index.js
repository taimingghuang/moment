$(function () {
        // let $('.hero-container-l').height() = 750;
        let imgCount = $('#content li').length;

        function get_height(){
          if(window.innerWidth > 820){
            return `translateY(${$('.hero-container-l').height() * index * -1}px)`

          }else{
            return `translateX(${$('.hero-container-l').height() * index * -1}px)`
          }
        }

        
        
        let index = 0;
        let timer = setInterval(moveToNext, 5000);

        $('.hero-dot').click(function(e) {
          e.preventDefault();
          clearInterval(timer);
          
          // <第幾個li>
          index = $(this).parent().index();
          
          // move
          $('#content').css({
            transform: get_height()
          });
          
          // update dot
          $('.hero-dot').removeClass('active');
          $(this).addClass('active');
          
          // timer reset
          timer = setInterval(moveToNext, 5000);
        });

        // move to next one
        function moveToNext() {
          if(index < imgCount - 1) {
            index++;
          } else {
            index = 0;
          }
          
          // move
          $('#content').css({
            transform: get_height()
          });
          
          // updat dot
          $('.hero-dot').removeClass('active');
          $('.hero-dot').eq(index).addClass('active');
        }

        
        // init active
        $('.hero-dot:first').addClass('active');
    });