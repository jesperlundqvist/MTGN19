$(document).ready(function() {
  var search = $("#search");

  searchUsers(search);

  $(document).on('input', '#search', function() {
    searchUsers(search);
  });

  // Om man trycker på escape
  $(document).keyup(function(event){
    if(event.keyCode == 27){
      $('#search').val("");
      searchUsers($('#search'));
    }
  });
});

// Search users
function searchUsers(search) {
  $.ajax({
    'url': "/functions_searchusers.php",
    'type': "POST",
    'data': {
      'search': search.val()
    },
    'success': function(output) {
      $("#profiles").empty();
      $("#profiles").append(output);
    }
  });
}


Date.prototype.getWeekNumber = function(){ //lägger till en funktion på Date som returnerar veckans nummer
  var d = new Date(+this);
  d.setHours(0,0,0);
  d.setDate(d.getDate()+4-(d.getDay()||7));
  return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};
Date.prototype.addDays = function(days) { //Med den här funktionen kan man lägga till och dra ifrån dagar från ett datum
  var d = new Date(+this);
  d.setDate(d.getDate() + days);
  return d;
};
Date.prototype.getDayOfWeek = function(){
  var d = this.getDay();
  if (d === 0) {
    d = 6;
  } else {
    d -= 1;
  }
  return d;
}

$(function() {
  $('.toggle-nav').click(function() {
      if ($('body').hasClass('show-nav')) {
          $('body').removeClass('show-nav').addClass('hide-nav');

          setTimeout(function() {
              $('body').removeClass('hide-nav');
          }, 500);

      } else {
          $('body').removeClass('hide-nav').addClass('show-nav');
      }

      return false;
  });
}