$(document).ready(function(){

  function updateCounter(){
    remainLength = 140 - this.textLength;
    let counter = $(this).parent().children('.counter');
    if (remainLength < 0){
      counter.css('color', 'red');
    } else{
      counter.css('color', 'black');
    }
    counter.text(remainLength);

  }

  $('.new-tweet form textarea').on('input', updateCounter);
});