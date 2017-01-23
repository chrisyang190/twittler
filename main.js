$(document).ready(function(){
        /*var $body = $('body');
        $body.html('');*/
        /*var $header = $('<h1>Twittler</h1>');
        $header.prependTo($body);
        var $twittlerFeed = $('<div class="twittlerFeed"></div>');
        $twittlerFeed.appendTo($body);*/
        var $twittlerFeed = $('.twittlerFeed');
        //$twittlerFeed.html('');
    //use code below and more to automatically add generated tweets

        //initial tweet list
        var index = streams.home.length - 1;
        while(index >= 0){
          var tweet = streams.home[index];
          var $tweet = $('<div class="tweet"><span class="user"></span><span class="message"></span></div>');
          var timeString = tweet.created_at.toLocaleTimeString();
          var dateString = tweet.created_at.toLocaleDateString();
          $tweet.children('.user').text('@' + tweet.user + ':');
          $tweet.children('.message').text(tweet.message + ' ' + dateString + ' ' + timeString);
          $tweet.prependTo($twittlerFeed);
          index -= 1;
        }
          homeArray = streams.home;
          streams.home = [];


        //automatic new tweet generation

        function updateFeed(){
          var tweet = streams.home.shift();
          var $tweet = $('<div class="tweet"><span class="user"></span><span class="message"></span></div>');
          var timeString = tweet.created_at.toLocaleTimeString();
          var dateString = tweet.created_at.toLocaleDateString();
          $tweet.children('.user').text('@' + tweet.user + ':');
          $tweet.children('.message').text(tweet.message + ' ' + dateString + ' ' + timeString);
          $tweet.prependTo($twittlerFeed).hide().fadeIn(2000);
          homeArray = homeArray.push(tweet);

        }

        $(document).ready(function() {
        setInterval(updateFeed, Math.random()*1500);
        });

        

 
      });
        