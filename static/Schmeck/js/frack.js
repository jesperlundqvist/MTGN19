function GetApiObject(url) {
    return {
        GetAll: function() {
            return axios({
                method: 'get',
                url: url,
                withCredentials: true,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            }).catch(function(error) {
                if (error.response.status == 401) {
                    Frack.Router.navigate("/login");
                }
            });
        },

        New: function(data) {
            return axios({
                method: "post",
                url: url,
                data: data,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            }).catch(function (error) {
                if (error.response.status == 401) {
                    Frack.Router.navigate("/login");
                }
            });
        },

        Update: function(id, data) {
            return axios({
                method: "post",
                url: url+"?"+id,
                data: data,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            }).catch(function (error) {
                if (error.response.status == 401) {
                    Frack.Router.navigate("/login");
                }
            });
        },

        Delete: function(id) {
            return axios({
                method: "delete",
                url: url+"?"+id,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            }).catch(function (error) {
                if (error.response.status == 401) {
                    Frack.Router.navigate("/login");
                }
            });
        },

        GetByFilter: function(filters) {
            return axios({
                method: "get",
                url: url + "?" +filters,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            }).catch(function (error) {
                if (error.response.status == 401) {
                    Frack.Router.navigate("/login");
                }
            });
        }
    }
}

var Frack = {
    Login: function(username, password) {
        return axios({
            method: "get",
            url: "/api/token",
            auth: {
                username: username,
                password: password
            }
        }).then(function(res) {
            sessionStorage.authToken = res.data.token;
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

    News: GetApiObject("/api/news/"),
    Media: GetApiObject("/api/media/")
};
