   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Mottagningen 2016</title>
    <link rel="stylesheet" href="css/bubbles.css" type="text/css">
  </head>

  <body>

    <?php
      //Load top content
      // include_once ('inc_top_content.php');
    ?>
    <div class="bubbles">
      <div class="content-wrapper">
        <div class="login-wrap">
          <h1 class="login-title">Mottagningen</h1>
            <input type="text" id="username" placeholder="Användarnamn"/>
            <br/>
            <input type="password" id="password" placeholder="Lösenord"/>
            <br/>
            <div id="error"></div>
            <button id="submit_btn">Logga in</button>
        </div>
      </div>
    </div>

  <script type="text/javascript">
  $( document).ready(function() {
  //       // Om man trycker på enter
      $(document).keydown(function(event){
          if(event.keyCode == 13){
              $("#submit_btn").click();
          }
      });

      $('#submit_btn').click(function() {
        //hasha
        var pass = hex_sha512($("#password").val());

        $.ajax({
          url: '/process_login.php',
          data: {
            username: $("#username").val(),
            password: pass
          },
          type: 'post',
          success: function(output) {
            // console.log(output);
            // output är tom...
            // console.log('loggas det inget...');
            if (output == 'false') {
              $("#error").html("Hoppsan, nu blev det fel! Försök igen.");
            } else { //inloggningen lyckades
              // var domain = document.domain;
              //window.location.href = "http://" + domain + "/index.php";
              window.location.href = "/";
            }
          }
        });
      });
  });

  var $bubbles = $('.bubbles');

  function bubbles() {
    
    // Settings
    var min_bubble_count = 15, // Minimum number of bubbles
        max_bubble_count = 30, // Maximum number of bubbles
        min_bubble_size = 3, // Smallest possible bubble diameter (px)
        max_bubble_size = 12; // Maximum bubble blur amount (px)
    
    // Calculate a random number of bubbles based on our min/max
    var bubbleCount = min_bubble_count + Math.floor(Math.random() * (max_bubble_count + 1));
    
    // Create the bubbles
    for (var i = 0; i < bubbleCount; i++) {
      $bubbles.append('<div class="bubble-container"><div class="bubble"></div></div>');
    }
    
    // Now randomise the various bubble elements
    $bubbles.find('.bubble-container').each(function(){
      
      // Randomise the bubble positions (0 - 100%)
      var pos_rand = Math.floor(Math.random() * 101);
      
      // Randomise their size
      var size_rand = min_bubble_size + Math.floor(Math.random() * (max_bubble_size + 1));
      
      // Randomise the time they start rising (0-15s)
      var delay_rand = Math.floor(Math.random() * 16);
      
      // Randomise their speed (3-8s)
      var speed_rand = 5 + Math.floor(Math.random() * 9);
      
      // Random blur
      var blur_rand = Math.floor(Math.random() * 3);
      
      // Cache the this selector
      var $this = $(this);
      
      // Apply the new styles
      $this.css({
        'left' : pos_rand + '%',
        
        '-webkit-animation-duration' : speed_rand + 's',
        '-moz-animation-duration' : speed_rand + 's',
        '-ms-animation-duration' : speed_rand + 's',
        'animation-duration' : speed_rand + 's',
        
        '-webkit-animation-delay' : delay_rand + 's',
        '-moz-animation-delay' : delay_rand + 's',
        '-ms-animation-delay' : delay_rand + 's',
        'animation-delay' : delay_rand + 's',
        
        '-webkit-filter' : 'blur(' + blur_rand  + 'px)',
        '-moz-filter' : 'blur(' + blur_rand  + 'px)',
        '-ms-filter' : 'blur(' + blur_rand  + 'px)',
        'filter' : 'blur(' + blur_rand  + 'px)',
      });
      
      $this.children('.bubble').css({
        'width' : size_rand + 'px',
        'height' : size_rand + 'px'
      });
      
    });
  }
  bubbles();

  </script>



  </body>
</html>
