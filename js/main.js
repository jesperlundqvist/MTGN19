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
