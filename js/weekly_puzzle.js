$(document).ready(function() {
  $(".secret").hide();
  $("#error").hide();

  var secret = "ipsum";

  // Om man trycker på enter
  $(document).keydown(function(event){
      if(event.keyCode == 13){
          $("#submit_answer_btn").click();
      }
  });

  $('#submit_answer_btn').click(function() {
    $(".message").remove();

    var answer = $("#puzzle-answer").val();

    if (answer.toLowerCase() == secret.toLowerCase()) {
      $(".secret").append("<p class=message>Responsum dare INPHO, sed in silentio. Vos autem nolo aliis audire loqui!</p>");
      $(".secret").append("<h1 class=message>QUOD EST VERUM</h1>").hide();
      $(".secret").fadeIn("slow");
    }
    else { // fel svar
      $(".secret").append("<p class=message>Responsum dare INPHO, sed in silentio. Vos autem nolo aliis audire!</p>");
      $(".secret").append("<h1 class=message>QUOD EST FALSUM</h1>").hide();
      $(".secret").fadeIn("slow");
    }
  });
});
