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

        function generateTweetList(tweetArray){
          var index = tweetArray.length - 1;
          while(index >= 0){
            var tweet = tweetArray[index];
            var $tweet = $('<div class="tweet"><span class="user"></span><span class="message"></span></div>');
            var timeString = tweet.created_at.toLocaleTimeString();
            var dateString = tweet.created_at.toLocaleDateString();
            $tweet.children('.user').text('@' + tweet.user + ':');
            $tweet.children('.message').text(tweet.message + ' ' + dateString + ' ' + timeString);
            $tweet.appendTo($twittlerFeed);
            index -= 1;
          }
        }

        function generateInitialHomeFeed(){
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
          generateInitialHomeFeed();

          //generateTweetList(streams.home);
        
          
          ///var homeArray = streams.home;
          //generateHomeList();
          //generateUserFeed('shawndrost');
          //generateTweetList(streams.users[shawndrost]);
          ///streams.home = [];
          
          var isPaused = false;
          function conditionalGenerateInitialHomeFeed(){
            if(!isPaused) {
              generateInitialHomeFeed();
            }
          }
        // $(document).ready(function() {
          var setLive = setInterval(conditionalGenerateInitialHomeFeed, Math.random()*1500);
        //});
       //if click on user
        
        

          $('body').on('click', '.utility', function(){
            //clearInterval(setUserLive);
            isPaused = false;
            $('.utility').text('Update Feed');
            generateInitialHomeFeed();
            //var setLive = setInterval(generateInitialHomeFeed, Math.random()*1500);
            ///generateHomeList();
          }) 

          $twittlerFeed.on('click', '.user', function(){
            isPaused = true;
            //clearInterval(setLive);
            var text = $(this).text()
            var sn = text.slice(1, text.length-1);
            generateUserFeed(sn);
            $('.utility').text('Home');
            //var setUserLive = setInterval(generateUserFeed, Math.random()*1500)
            
          });

        //automatic new tweet generation

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


        

        /*
         $('body').on('click', '.timer', function(){
            $('.timer').text('Auto Refresh Live Feed');
            clearInterval(setLive);
            generateInitialHomeFeed();
            ///generateHomeList();
          }) 
          */
        

        //click on username to see user timeline
        //back button rendered only when filtered to user

 
      });
        