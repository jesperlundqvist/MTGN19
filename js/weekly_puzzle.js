$(document).ready(function() {
  $(".secret").hide();
  $("#error").hide();

  var secret = "LOREM";

  // Om man trycker på enter
  $(document).keydown(function(event){
      if(event.keyCode == 13){
          $("#submit_answer_btn").click();
      }
  });

  $('#submit_answer_btn').click(function() {
    var answer = $("#puzzle-answer").val();

    if (answer.toLowerCase() == secret.toLowerCase()) {
      $(".secret").fadeIn("slow");
    }
    else { // fel svar
      $("#error").show();
    }
  });
});
