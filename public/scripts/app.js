/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function createTweetElement(data){
  const id = data._id;
  const userName = data.user.name;
  const avatar = data.user.avatars.regular;
  const handle = data.user.handle;
  const tweetContent = data.content.text;
  const like = data.like;
  const date = `${Math.round((Date.now() - Number(data.created_at))/(1000*3600*24))} days ago`;

  let $newTweet = `
      <article class='tweet' id = ${id}>
        <header>
          <img class='avatar' src=${avatar}>
          <h2>${userName}</h2>
          <div>${handle}</div>
        </header>
        <div class='tweet-content'>
          <p>${tweetContent}</p>
        </div>
        <footer>
          <p>${date}</p>
          <div class='tweet-icons'>

            <form class='flag'>
              <i class='icon ion-md-flag'></i>
            </form>
            <form class='retweet'>
              <i class='icon ion-md-repeat'></i>
            </form>
            <form class='like'>
              <i class='icon ion-md-heart'></i>
            </form>
            <div class='like-count'>
              ${like}
            </div>
          </div>
        </footer>
      </article>`;
  return $newTweet;
}


function renderTweets(json){
  json.forEach(function(tweet){
    $('#tweet-container').prepend(createTweetElement(tweet));
  });
}

// Charactor Counter

function updateCounter(){
  let textArea = $('.new-tweet form textarea');
  let counter = textArea.parent().children('.counter');
  let remainLength;
  if (!textArea.textLength){
    counter.text(140);
  } else{
    remainLength = 140 - textArea.textLength;
    if (remainLength < 0){
      counter.css('color', 'red');
    } else{
      counter.css('color', 'black');
    }
    counter.text(remainLength);
  }
}

// Error Message
function errorMessage(message){
  $(".alert").text(message);
  $(".alert").slideDown(200);
}

function clearError(){
  if ($(".alert").is(":visible"))
  $(".alert").slideUp(200);
}


// AJAX POST Handler

function postTweet(){
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  $(".new-tweet form").on('submit', function(evt){
    evt.preventDefault();
    clearError();
    let remainSpace = $('.new-tweet span').text();
    if (remainSpace >= 0 && remainSpace < 140){
      // Process and serialize user input
      let tweetContent = $(this).find("textarea").val();
      $(this).find("textarea").val(escape(tweetContent));
      let newTweet = $(this).serialize();

      $.post("/tweets", newTweet).done(function(data, statusText, response){
        if (response.status == 201){
          loadTweets();
        }
      });

      $(this).trigger('reset');
      window.setTimeout(100, updateCounter());
    } else if (remainSpace == 140){
      errorMessage("You cannot submit an empty tweet!");
    } else {
      errorMessage('Charater limit exceeded!');
    }
  });
}

// AJAX Load Tweets

function loadTweets(){
  clearError();
  $('#tweet-container').empty();
  $.getJSON('/tweets').then(renderTweets)
    .fail(function(){errorMessage("Some error occured")});
}


// Document.ready

$(document).ready(function(){

  $('.new-tweet form textarea').on('input', updateCounter);
  loadTweets();
  postTweet();

  $("#compose-btn").click(function(){
    let $new = $('.new-tweet');
    if ($new.is(":hidden")){
      $new.slideDown(100);
      $new.find('textarea').focus();
    } else{
      $new.slideUp(100);
    }
  });


// Like feature

// action="/?_method=PUT" method="post"
  $('#tweet-container').on('click', 'i', (function(){
    console.log("like button clicked");
    // $(this).parent().submit();
    console.log($(this).parents("article").attr("id"));
    const likeNum = Number($(this).parents("div").children(".like-count").text());
    console.log(likeNum);
    $.ajax({
      type:"put",
      url: "/tweets",
      data: {
        id:$(this).parents("article").attr("id"),
        likeNum: likeNum
      },
      success: function(){
        console.log("Put request sent");
      }
    });

    $(this).parents("div").children(".like-count").text(likeNum+1);
  }));
});
