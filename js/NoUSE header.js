$(function () {
  $('.menu').click(function(){
      // $(this).addClass('active')
      $(this).toggleClass('active')
      console.log('Menu clicked! Active class toggled.');
  })
})