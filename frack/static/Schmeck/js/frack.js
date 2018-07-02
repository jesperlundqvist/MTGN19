function GetApiObject(url) {
    return {
        GetAll: function() {
            return $.ajax({
                method: "GET",
                url: url,
                username: sessionStorage.authToken,
                password: ""
            }).fail(function (res) {
                if (res.status == 401) {
                    Frack.Router.navigate("/login");
                }
            });
        },

        GetById: function(id) {
            return $.ajax({
                method: "GET",
                url: url + id,
                username: sessionStorage.authToken,
                password: ""
            }).fail(function (res) {
                if (res.status == 401) {
                    Frack.Router.navigate("/login");
                }
            });
        },

        New: function(data) {
            return $.ajax({
                method: "POST",
                url: url,
                data: data,
                username: sessionStorage.authToken,
                password: ""
            }).fail(function (res) {
                if (res.status == 401) {
                    Frack.Router.navigate("/login");
                }
            });
        },

        Update: function(id, data) {
            return $.ajax({
                method: "POST",
                url: url+id,
                data: data,
                username: sessionStorage.authToken,
                password: ""
            }).fail(function (res) {
                if (res.status == 401) {
                    Frack.Router.navigate("/login");
                }
            });
        },

        Delete: function(id) {
            return $.ajax({
                method: "DELETE",
                url: url+id,
                username: sessionStorage.authToken,
                password: ""
            }).fail(function (res) {
                if (res.status == 401) {
                    Frack.Router.navigate("/login");
                }
            });
        }
    }
}

var Frack = {
    Login: function(username, password) {
        return $.ajax({
            method: "GET",
            url: "/api/token",
            username: username,
            password: password
        }).done(function(data) {
            sessionStorage.authToken = data.token;
        });
    },

    Logout: function() {
        sessionStorage.authToken = "0";
    },

    HasToken: function() {
        return (sessionStorage.getItem("authToken") != "0")
    },

    CheckToken: function() {
        return $.ajax({
            method: "POST",
            url: "/api/checkToken",
            data: {
                token: sessionStorage.authToken
            }
        });
    },

    News: GetApiObject("/api/news/")
};
