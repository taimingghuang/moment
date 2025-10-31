function initUpButton() {
    
    const $upButton = $('.up-button');


    // desktop => tilt套件
    if ($.fn.tilt) { 
        $upButton.tilt({            
            maxTilt: 10,     
            scale: 1.2,     
            speed: 500,     
            perspective: 1000 
        });
    } 
    // =============================================

    const HEADER_HEIGHT_OFFSET = -5

    // click scroll up
    $upButton.on('click', function(e) {
        e.preventDefault(); 
        $('html, body').animate({
            scrollTop: HEADER_HEIGHT_OFFSET
        }, 800);
    });

    // > 50% show up
    $(window).on('scroll', function() {
        const scrollPosition = $(window).scrollTop();
        const documentHeight = $(document).height();
        const windowHeight = $(window).height();
        
        // 50%
        const threshold = (documentHeight - windowHeight) * 0.50; 
        
        if (scrollPosition > threshold) {
            $upButton.fadeIn(); 
        } else {
            $upButton.fadeOut(); 
        }
    });

    $(window).trigger('scroll');
}