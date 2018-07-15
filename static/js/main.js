$(document).ready(function() {
    Handlebars.registerHelper('active', function(variable, value) {
        if (variable == value) {
            return new Handlebars.SafeString('active');
        }
        else {
            return '';
        }
    });

    Handlebars.registerHelper('selected', function(variable, value) {
        if (variable == value) {
            return new Handlebars.SafeString('selected');
        }
        else {
            return '';
        }
    });

    Handlebars.registerHelper('inlineBool', function(ret, bool) {
        if (bool) {
            return new Handlebars.SafeString(ret);
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
                preloadTemplate("/static/templates/article.html");
                preloadTemplate("/static/templates/sidebar.html");
                renderTemplate("#content", "/static/templates/nyheter.html", {news: res.data});
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "nyheter", user: Frack.CurrentUser});
            });
        },

        '/nyhet/:id/': function(params, query) {
            preloadTemplate("/static/templates/article.html");
            preloadTemplate("/static/templates/sidebar.html");
            Frack.News.GetByFilter("id=" + params.id).then(function(res) {
                renderTemplate("#content", "/static/templates/article.html", {article: res.data});
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "nyheter", user: Frack.CurrentUser});
            });
        },

        '/schema': function() {
            renderTemplate("#content", "/static/templates/schema.html");
            renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "schema", user: Frack.CurrentUser});
        },

        '/profiler': function() {
            preloadTemplate("/static/templates/profiler.html");
            preloadTemplate("/static/templates/sidebar.html");
            Frack.User.GetAll().then(function(res) {
                var users = res.data;
                var n0llan = {};
                var phos = {};

                users.forEach(function(user) {
                    if (!user.hidden) {
                        if (user.type.name == "nØllan") {
                            if (user.n0llegroup) {
                                n0llan[user.n0llegroup.name] = n0llan[user.n0llegroup.name] || [];
                                n0llan[user.n0llegroup.name].push(user);
                            }
                            else {
                                console.log("Ogiltig nØllan \"" + user.username + "\". Har ingen nØllegrupp.");
                            }
                        }
                        else {
                            phos[user.type.name] = phos[user.type.name] || [];
                            phos[user.type.name].push(user);
                        }
                    }
                });

                renderTemplate("#content", "/static/templates/profiler.html", {n0llan: n0llan, phos: phos});
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "profiler", user: Frack.CurrentUser});
            });
        },

        '/profiler/:username': function(params, query) {
            preloadTemplate("/static/templates/profil.html");
            preloadTemplate("/static/templates/sidebar.html");
            Frack.User.GetByFilter("username=" + params.username).then(function(res) {
                var isCurrent = false;

                if (res.data.id == Frack.CurrentUser.id)
                {
                    isCurrent = true;
                }

                renderTemplate("#content", "/static/templates/profil.html", {user: res.data, isCurrent: isCurrent});
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "profiler", user: Frack.CurrentUser});
            });
        },

        '/profiler/:username/redigera': function(params, query) {
            preloadTemplate("/static/templates/redigeraprofil.html");
            preloadTemplate("/static/templates/sidebar.html");
            Frack.User.GetByFilter("username=" + params.username).then(function(res) {
                if (Frack.CurrentUser.id == res.data.id)
                {
                    renderTemplate("#content", "/static/templates/redigeraprofil.html", {user: res.data});
                    renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "profiler", user: Frack.CurrentUser});
                }
                else
                {
                    renderTemplate("#page", "/static/templates/403.html");
                }
            });
        },

        '/media': function(params, query) {
            renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "media", user: Frack.CurrentUser});
            preloadTemplate("/static/templates/media.html");

            if(query == ""){
                Frack.Media.GetAll().then(function(res) {
                    renderTemplate("#content", "/static/templates/media.html", {media : res.data});
                })
            }else{
                Frack.Media.GetByFilter(query).then(function(res){
                    renderTemplate("#content", "/static/templates/media.html", {media : res.data});
                })
            }
        },

        '/blandaren': function() {
            renderTemplate("#content", "/static/templates/blandaren.html");
            renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "blandaren", user: Frack.CurrentUser});
        },

        '/admin': function() {
            if (Frack.CurrentUser.admin)
            {
                renderTemplate("#content", "/static/templates/admin.html");
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "admin", user: Frack.CurrentUser});
            }
            else {
                renderTemplate("#page", "/static/templates/403.html");
            }
        },

        '/admin/skapa_nyhet': function() {
            renderTemplate("#content", "/static/templates/newpost.html");
            renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "admin", user: Frack.CurrentUser});
        },

        '/admin/hantera_nyheter': function() {
            preloadTemplate("/static/templates/manageposts.html");
            preloadTemplate("/static/templates/sidebar.html");
            Frack.News.GetAll().then(function(res) {
                renderTemplate("#content", "/static/templates/manageposts.html", {news: res.data});
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "admin", user: Frack.CurrentUser});
            });
        },

        '/admin/skapa_anvandare': function() {
            var requests = [Frack.UserType.GetAll(), Frack.N0lleGroup.GetAll()];
            axios.all(requests).then(function(res) {
                types = res[0].data;
                groups = res[1].data;

                renderTemplate("#content", "/static/templates/createuser_simple.html", {
                    user_types: types,
                    n0llegroups: groups
                });
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "admin", user: Frack.CurrentUser});
            });
        },

        '/admin/hantera_anvandare': function() {
            preloadTemplate("/static/templates/profiler.html");
            preloadTemplate("/static/templates/sidebar.html");

            var requests = [Frack.UserType.GetAll(), Frack.N0lleGroup.GetAll(), Frack.User.GetAll()];
            axios.all(requests).then(function(res) {
                types = res[0].data;
                groups = res[1].data;
                users = res[2].data;

                renderTemplate("#content", "/static/templates/manageusers.html", {
                    users: users,
                    user_types: types,
                    n0llegroups: groups
                });
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "admin", user: Frack.CurrentUser});
            });
        },

        '/admin/hantera_n0llegrupper': function() {
            preloadTemplate("/static/templates/managen0llegroups.html");
            preloadTemplate("/static/templates/sidebar.html");
            Frack.N0lleGroup.GetAll().then(function(res) {
                renderTemplate("#content", "/static/templates/managen0llegroups.html", {n0llegroups: res.data});
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "admin", user: Frack.CurrentUser});
            });
        },

        '/admin/hantera_typer': function() {
            preloadTemplate("/static/templates/manageusertypes.html");
            preloadTemplate("/static/templates/sidebar.html");
            Frack.UserType.GetAll().then(function(res) {
                renderTemplate("#content", "/static/templates/manageusertypes.html", {types: res.data});
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "admin", user: Frack.CurrentUser});
            });
        },

        '/login': function() {
            renderTemplate("#page", "/static/templates/login.html");
        },

        '/admin/upload':function() {
            renderTemplate("#content", "/static/templates/upload.html");
            renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "admin", user: Frack.CurrentUser});
        },
        '/admin/upload_blandaren':function() {
            renderTemplate("#content", "/static/templates/blandaren_upload.html");
        }
    });

    Frack.Router.notFound(function (query) {
        renderTemplate("#page", "/static/templates/404.html");
    });

    Frack.Router.resolve();
});
