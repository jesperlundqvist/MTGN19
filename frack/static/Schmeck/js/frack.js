function GetApiObject(url) {
    return {
        GetAll: function(callback, error) {
            var request = new XMLHttpRequest();

            request.open('GET', url, true, sessionStorage.authToken);
            request.onload = function () {
                var data = JSON.parse(this.response);

                if (request.status >= 200 && request.status < 400) {
                    callback(data);
                }
                else if (request.status == 401) {
                    window.location.replace("/login");
                }
                else {
                    error(request);
                }
            }

            request.send();
        },

        GetById: function(id, callback) {
            var request = new XMLHttpRequest();

            request.open('GET', url + id, true, sessionStorage.authToken);
            request.onload = function () {
                var data = JSON.parse(this.response);

                if (request.status >= 200 && request.status < 400) {
                    callback(data);
                }
                else if (request.status == 401) {
                    window.location.replace("/login");
                }
                else {
                    error(request);
                }
            }

            request.send();
        },

        New: function(data, callback) {
            var request = new XMLHttpRequest();

            request.open('POST', url, true, sessionStorage.authToken);
            request.setRequestHeader("Content-Type", "application/json");

            request.onreadystatechange = function() {
                if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    var data = JSON.parse(this.response);
                    callback(data);
                }
                else if (request.status == 401) {
                    window.location.replace("/login");
                }
                else {
                    error(request);
                }
            }

            request.send(JSON.stringify(data));
        },

        Update: function(id, data, callback) {
            var request = new XMLHttpRequest();

            request.open('POST', url + id, true, sessionStorage.authToken);
            request.setRequestHeader("Content-Type", "application/json");

            request.onreadystatechange = function() {
                if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    callback();
                }
                else if (request.status == 401) {
                    window.location.replace("/login");
                }
                else {
                    error(request);
                }
            }

            request.send(JSON.stringify(data));
        },

        Delete: function(id, callback) {
            var request = new XMLHttpRequest();

            request.open('DELETE', url + id, true, sessionStorage.authToken);
            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    callback();
                }
                else if (request.status == 401) {
                    window.location.replace("/login");
                }
                else {
                    error(request);
                }
            }

            request.send();
        }
    }
}

var Frack = {
    Login: function(username, password, callback, error) {
        var request = new XMLHttpRequest();

        request.open('GET', "/api/token", true, username, password);
        request.onload = function () {
            var data = JSON.parse(this.response);

            if (request.status >= 200 && request.status < 400) {
                sessionStorage.authToken = data.token;
                if (callback) {
                    callback();
                }
            } else {
                error(request);
            }
        }

        request.send();
    },

    Logout: function() {
        sessionStorage.clear();
    },

    LoggedIn: function() {
        return (sessionStorage.getItem("authKey") != null)
    },

    News: GetApiObject("/api/news/")
};
