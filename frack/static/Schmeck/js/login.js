function login(event)
{
    event.preventDefault();

    var username = $("#usernameField").val();
    var password = $("#passwordField").val();

    Frack.Login(username, password,
    function() {
        Frack.Router.navigate("/");
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
    if (Frack.HasAuthToken())
    {
        Frack.Router.navigate("/");
    }

    $("#loginForm").submit(login);
});
