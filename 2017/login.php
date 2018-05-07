   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Mottagningen</title>
  </head>
  <!-- Color: #784800 -->
  <body class="login-body">

    <?php
      //Load top content
      // include_once ('inc_top_content.php');
    ?>
    <div class="bubbles">
      <div class="content-wrapper" style="background-color: rgba(0,0,0,0); padding-top: 0 !important;">
        <div class="login-wrap">
          <h1 class="login-title">Mottagningen</h1>
            <input type="text" id="username" placeholder="Användarnamn" autocorrect="off" />
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
  </script>



  </body>
</html>
