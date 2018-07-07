function GetApiObject(url) {
    return {
        GetAll: function() {
            return axios({
                method: 'get',
                url: url,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
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
            });
        },

        Update: function(id, data) {
            return axios({
                method: "put",
                url: url+"?id="+id,
                data: data,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            });
        },

        Delete: function(id) {
            return axios({
                method: "delete",
                url: url+"?id="+id,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
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
            return Frack.UpdateCurrentUser();
        });
    },

    Logout: function() {
        sessionStorage.authToken = "0";
    },

    HasToken: function() {
        return (sessionStorage.getItem("authToken") != "0")
    },

    UpdateCurrentUser: function() {
        return axios({
            method: "get",
            url: "/api/currentUser",
            auth: {
                username: sessionStorage.authToken,
                password: ""
            }
        }).then(function(res) {
            Frack.CurrentUser = res.data;
        });
    },

    CurrentUser: null,

    News: GetApiObject("/api/news/"),
    Media: GetApiObject("/api/media/"),
    User: GetApiObject("/api/user/")
};
