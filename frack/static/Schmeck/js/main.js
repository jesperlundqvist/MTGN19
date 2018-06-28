$(document).ready(function() {
    Frack.News.GetAll(function(data) {
        console.log(data);
    }, function(error) {
        console.log(error);
    });
});
