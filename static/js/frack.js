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
            url: "/api/currentUser/",
            auth: {
                username: sessionStorage.authToken,
                password: ""
            }
        }).then(function(res) {
            Frack.CurrentUser = res.data;
        });
    },

    CurrentUser: null,

    TemplateCache: {},

    News: GetApiObject("/api/news/"),
    Media: GetApiObject("/api/media/"),
    User: GetApiObject("/api/user/"),
    UserType: GetApiObject("/api/user_type/"),
    N0lleGroup: GetApiObject("/api/n0llegroup/"),
    Blandaren: GetApiObject("/api/blandaren"),
    Event: GetApiObject("/api/event/")
};

function preloadTemplate(url) {
    if (!(url in Frack.TemplateCache))
    {
        axios({
            method: "get",
            url: url + "?v1"
        }).then(function(res) {
            var template = Handlebars.compile(res.data);
            Frack.TemplateCache[url] = template;
        }).catch(function(error) {
            console.error(error);
        });
    }
}

function renderTemplate(selector, url, data) {
    if (!(url in Frack.TemplateCache))
    {
        axios({
            method: "get",
            url: url + "?v1"
        }).then(function(res) {
            var template = Handlebars.compile(res.data);

            $(selector).html(template(data));
            Frack.Router.updatePageLinks();
            $("#page").show();

            Frack.TemplateCache[url] = template;
        }).catch(function(error) {
            console.error(error);
        });
    }
    else {
        $(selector).html(Frack.TemplateCache[url](data));
        Frack.Router.updatePageLinks();
        $("#page").show();
    }
}
