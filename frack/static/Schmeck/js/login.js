function login(event)
{
    event.preventDefault();

    var username = $("#usernameField").val();
    var password = $("#passwordField").val();

    Frack.Login(username, password,
    function() {
        window.location.replace("/");
    },
    function(request) {
        console.log(request);
        if (request.status == 401)
        {
            $("#errorField").text("Fel användarnamn eller lösenord.");
        }
    });
}

$(document).ready(function() {
    $("#loginForm").submit(login);
});
