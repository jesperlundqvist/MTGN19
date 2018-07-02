function login(event)
{
    event.preventDefault();

    var username = $("#usernameField").val();
    var password = $("#passwordField").val();

    Frack.Login(username, password).done(function(data) {
        window.location.replace("/");
    }).fail(function(res) {
        if (res.status == 401)
        {
            $("#errorField").css("display", "block");
            $("#errorField").text("Fel användarnamn eller lösenord.");
        }
    });
}

$(document).ready(function() {
    $("#loginForm").submit(login);
});
