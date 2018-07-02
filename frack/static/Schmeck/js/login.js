function login(event)
{
    event.preventDefault();

    var username = $("#usernameField").val();
    var password = $("#passwordField").val();

    Frack.Login(username, password).then(function(response) {
        window.location.replace("/");
    }).catch(function(error) {
        if (error.response.status == 401)
        {
            $("#errorField").css("display", "block");
            $("#errorField").text("Fel användarnamn eller lösenord.");
        }
    });
}

$(document).ready(function() {
    $("#loginForm").submit(login);
});
