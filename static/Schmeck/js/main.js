function renderTemplate(selector, url, data) {
    axios({
        method: "get",
        url: url
    }).then(function(res) {
        var template = Handlebars.compile(res.data);

        $(selector).html(template(data));
        Frack.Router.updatePageLinks();
    }).catch(function(error) {
        console.error(error);
    });
}

$(document).ready(function() {
    Handlebars.registerHelper('active', function(variable, value) {
        if (variable == value) {
            return new Handlebars.SafeString('active');
        }
        else {
            return '';
        }
    });

    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if (v1 === v2){
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('unlessCond', function(v1, v2, options) {
        if (v1 !== v2){
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('formatDate', function(date) {
        var d = new Date(date);

        var str = d.toLocaleDateString("sv-SE", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return new Handlebars.SafeString(str);
    });

    Frack.Router = new Navigo(window.location.origin);

    Frack.Router.hooks({
        before: function(done, params) {
            Frack.UpdateCurrentUser().then(function() {
                done();
            }).catch(function(error) {
                if (error.response.status == 401) {
                    Frack.Router.navigate("/login");
                    done();
                }
            });
        }
    });

    Frack.Router.on({
        '/': function() {
            Frack.News.GetAll().then(function(res) {
                renderTemplate("#content", "/templates/nyheter.html", {news: res.data});
                renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "nyheter", user: Frack.CurrentUser});
            });
        },

        '/nyhet/:id/': function(params, query) {
            Frack.News.GetByFilter("id=" + params.id).then(function(res) {
                renderTemplate("#content", "/templates/article.html", {article: res.data});
                renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "nyheter", user: Frack.CurrentUser});
            });
        },

        '/schema': function() {
            renderTemplate("#content", "/templates/schema.html");
            renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "schema", user: Frack.CurrentUser});
        },

        '/profiler': function() {
            Frack.User.GetAll().then(function(res) {
                var users = res.data;
                var n0llan = {};
                var phos = {};
                users.forEach(function(user) {
                    if (!user.hidden) {
                        if (user.type.name == "nØllan") {
                            n0llan[user.n0llegroup.name] = n0llan[user.n0llegroup.name] || [];
                            n0llan[user.n0llegroup.name].push(user);
                        }
                        else {
                            phos[user.type.name] = phos[user.type.name] || [];
                            phos[user.type.name].push(user);
                        }
                    }
                });

                renderTemplate("#content", "/templates/profiler.html", {n0llan: n0llan, phos: phos});
                renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "profiler", user: Frack.CurrentUser});
            });
        },

        '/profiler/:username': function(params, query) {
            Frack.User.GetByFilter("username=" + params.username).then(function(res) {
                renderTemplate("#content", "/templates/profil.html", {user: res.data});
                renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "profiler", user: Frack.CurrentUser});
            });
        },

        '/media': function(params, query) {
            renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "media", user: Frack.CurrentUser});

            console.log(query);
            if(query == ""){
                Frack.Media.GetAll().then(function(res) {
                    renderTemplate("#content", "/templates/media.html", {media : res.data});
                })
            }else{
                Frack.Media.GetByFilter(query).then(function(res){
                    renderTemplate("#content", "/templates/media.html", {media : res.data});
                })
            }
        },

        '/blandaren': function() {
            renderTemplate("#content", "/templates/blandaren.html");
            renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "blandaren"});
        },

        '/login': function() {
            renderTemplate("#page", "/templates/login.html");
        },
        '/upload':function() {
            renderTemplate("#content", "/templates/upload.html")
        }
    });

    Frack.Router.notFound(function (query) {
        renderTemplate("#page", "/templates/404.html");
    });

    Frack.Router.resolve();
});
