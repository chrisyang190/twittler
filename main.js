$(document).ready(function(){
        /*var $body = $('body');
        $body.html('');*/
        /*var $header = $('<h1>Twittler</h1>');
        $header.prependTo($body);
        var $twittlerFeed = $('<div class="twittlerFeed"></div>');
        $twittlerFeed.appendTo($body);*/
        var $twittlerFeed = $('.twittlerFeed');
        //$twittlerFeed.html('');
    
        function generateTweetList(tweetArray){
          var index = tweetArray.length - 1;
          while(index >= 0){
            var tweet = tweetArray[index];
            var $tweet = $('<div class="tweet"><span class="user"></span><span class ="time"></span><div class="message"></div></div>');
            var timeString = tweet.created_at.toLocaleTimeString();
            var dateString = tweet.created_at.toLocaleDateString();
            var timeAgo = $.timeago(tweet.created_at);
            $tweet.children('.user').text('@' + tweet.user + ':');
            $tweet.children('.message').text(tweet.message + ' ');//dateString + ' ' + timeString);
            $tweet.children('.time').text(' ' + timeAgo)
            $tweet.appendTo($twittlerFeed)//.hide().slideDown(1000);
            index -= 1;
          }
        }

        function generateHomeFeed(){
          $twittlerFeed.children('div').remove();
          generateTweetList(streams.home);
        }
        /*
        function generateHomeList() {
          $twittlerFeed.children('div').remove();
          generateTweetList(homeArray);
        }
        */
        function generateUserFeed(username){
          $twittlerFeed.children('div').remove();
          generateTweetList(streams.users[username]);
        }
          //initial tweet list
          generateHomeFeed();
          
          var isPaused = false;
          function conditionalGenerateHomeFeed(){
            if(!isPaused) {
              generateHomeFeed();
            }
          }

          /*var isPaused2 = true;
          function conditionalGenerateUserFeed(){
            if(!isPaused2) {
              return generateUserFeed.call(this, argument);
            }
          }*/
    ///var setLive = setInterval(conditionalGenerateUserFeed, Math.random()*1500);

      //automatic new tweet generation
      var setLive = setInterval(conditionalGenerateHomeFeed, Math.random()*1500);

       //if click on user
          $('body').on('click', '.utility', function(){
            //clearInterval(setUserLive);
            isPaused = false;
            //isPaused2 = true;
            $('.utility').hide();
            generateHomeFeed();
            //var setLive = setInterval(generateHomeFeed, Math.random()*1500);
            ///generateHomeList();
          }) 

          $twittlerFeed.on('click', '.user', function(){
            isPaused = true;
            //isPaused2 = false;
            //clearInterval(setLive);
            var text = $(this).text()
            var sn = text.slice(1, text.length-1);
            generateUserFeed(sn);
            $('.utility').show().text('Back to Twittler Feed');
            //var setUserLive = setInterval(generateUserFeed, Math.random()*1500)
            
          });

      // Visitor tweet writing functions
        streams.users['visitor'] = [];
        $('body').on('click', '.submit', function(){
          //writeTweet($('textarea').val());
          var tweet = {};
          tweet.created_at = new Date();
          tweet.user = 'visitor';
          tweet.message = $('textarea').val();
          console.log(tweet.message);
          streams.home.push(tweet);
          streams.users['visitor'].push(tweet); 

        });
        

        /*function updateFeed(){
          var tweet = streams.home.shift();
          var $tweet = $('<div class="tweet"><span class="user"></span><span class="message"></span></div>');
          var timeString = tweet.created_at.toLocaleTimeString();
          var dateString = tweet.created_at.toLocaleDateString();
          $tweet.children('.user').text('@' + tweet.user + ':');
          $tweet.children('.message').text(tweet.message + ' ' + dateString + ' ' + timeString);
          $tweet.prependTo($twittlerFeed).hide().fadeIn(2000);
          homeArray = homeArray.push(tweet);

        } */


        

        
         /*$('body').on('click', '.timer', function(){
            $('.timer').text('Auto Refresh Live Feed');
            isPaused = true;
            ///generateHomeList();
          }) 
          */
        

        //click on username to see user timeline
        //back button rendered only when filtered to user

 
      });
        