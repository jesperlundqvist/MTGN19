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

    Handlebars.registerHelper('toWeekDay', function(num) {
        var str = "";

        if (num == 6) {
            str = "Söndag";
        } else if (num == 0) {
            str = "Måndag";
        } else if (num == 1) {
            str = "Tisdag";
        } else if (num == 2) {
            str = "Onsdag";
        } else if (num == 3) {
            str = "Torsdag";
        } else if (num == 4) {
            str = "Fredag";
        } else if (num == 5) {
            str = "Lördag";
        }

        return new Handlebars.SafeString(str);
    });

    function getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return week number
        return weekNo;
    }

    function getDateOfISOWeek(w, y) {
        var simple = new Date(y, 0, 1 + (w - 1) * 7);
        var dow = simple.getDay();
        var ISOweekStart = simple;
        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        return ISOweekStart;
    }

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
            preloadTemplate("/static/templates/article.html");
            preloadTemplate("/static/templates/sidebar.html");
            Frack.News.GetAll().then(function(res) {
                renderTemplate("#content", "/static/templates/nyheter.html", {news: res.data});
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "nyheter", user: Frack.CurrentUser});
            });
        },

        '/nyhet/:id/': function(params, query) {
            preloadTemplate("/static/templates/article.html");
            preloadTemplate("/static/templates/sidebar.html");
            Frack.News.GetByFilter("id=" + params.id).then(function(res) {
                renderTemplate("#content", "/static/templates/article.html", {article: res.data, isAdmin: Frack.CurrentUser.admin});
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "nyheter", user: Frack.CurrentUser});
            });
        },

        '/schema': function () {
            var currentWeek = getWeekNumber(new Date());

            if (currentWeek < 33) {
                currentWeek = 33;
            } else if (currentWeek > 36) {
                currentWeek = 36;
            }

            Frack.Router.navigate('/schema/' + currentWeek);
        },

        '/schema/:week': function(params) {
            var browserKey = 'AIzaSyC-0HQfVbXdEjF52aCm6rK9UMIrWglIskk';
            var calendarid = "67o81suoslm4i02r6kr9vldek4@group.calendar.google.com"; // Mottagningen 2018

            preloadTemplate("/static/templates/schema.html");
            preloadTemplate("/static/templates/sidebar.html");

            var weekToShow = parseInt(params.week);
            var prevWeek = weekToShow - 1;
            var nextWeek = weekToShow + 1;

            if (prevWeek < 33) {
                prevWeek = 0;
            } else if (nextWeek > 36) {
                nextWeek = 0;
            }

            var startQuery = getDateOfISOWeek(weekToShow, 2018);
            var endQuery = new Date(startQuery);
            endQuery.setUTCDate(endQuery.getUTCDate() + 7);

            var currentDay = undefined;
            var today = new Date();
            if (today > startQuery && today < endQuery) {
                currentDay = today.getUTCDay();

                if (currentDay == 0) {
                    currentDay = 6;
                } else {
                    currentDay--;
                }
            }

            axios({
                method: "get",
                url: "https://www.googleapis.com/calendar/v3/calendars/" + calendarid + "/events",
                params: {
                    key: browserKey,
                    orderBy: "startTime",
                    singleEvents: true,
                    timeMin: startQuery,
                    timeMax: endQuery
                }
            }).then(function(res) {
                var events = res.data.items;
                var weeks = {};

                var eventSizeMultiplier = 50;

                events.forEach(function (ev, index) {
                    var start = new Date(ev.start.dateTime);
                    var end = new Date(ev.end.dateTime);

                    var week = getWeekNumber(start);
                    var day = start.getUTCDay();

                    if (day == 0) {
                        day = 6;
                    } else {
                        day--;
                    }

                    var diff = new Date(new Date(ev.end.dateTime) - new Date(ev.start.dateTime));
                    ev["height"] = Math.round(diff.getUTCHours() * eventSizeMultiplier + (diff.getUTCMinutes()/60 * eventSizeMultiplier));

                    ev["duration_str"] =
                    start.toLocaleDateString("sv-SE", {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }) + ", " +
                    start.toLocaleTimeString("sv-SE", {"hour": "2-digit", "minute": "2-digit"}) + " - " + end.toLocaleTimeString("sv-SE", {"hour": "2-digit", "minute": "2-digit"});

                    weeks[week] = weeks[week] || [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
                    weeks[week][day] = weeks[week][day] || [];
                    weeks[week][day].push(ev);

                    var i = weeks[week][day].length - 1;

                    if (i == 0) {
                        weeks[week][day][i]["topPosition"] = Math.round(start.getUTCHours() * eventSizeMultiplier + (start.getUTCMinutes()/60 * eventSizeMultiplier));
                        weeks[week][day][i]["topPosition"] -= 6 * eventSizeMultiplier; // Börja varje dag kl 8
                    }
                    else {
                        var prevEventEnd = new Date(weeks[week][day][i-1].end.dateTime);
                        var diffToPrevious = new Date(new Date(ev.start.dateTime) - prevEventEnd);
                        weeks[week][day][i]["topPosition"] = Math.round(diffToPrevious.getUTCHours() * eventSizeMultiplier + (diffToPrevious.getUTCMinutes()/60 * eventSizeMultiplier));
                    }
                });

                renderTemplate("#content", "/static/templates/schema.html", {weeks: weeks, prevWeek: prevWeek, nextWeek: nextWeek, currentDay: currentDay});
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "schema", user: Frack.CurrentUser});
            }).catch(function(error) {
                console.error(error);
            });
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
                        user["portrait_rot"] = (user.id + user.name.charCodeAt(0)) % 10 - 5;
                        if (user.type.name == "nØllan") {
                            if (user.n0llegroup) {
                                user["portrait_rot"] = (user.id + user.name.charCodeAt(0)) % 10 - 5;

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
                    renderTemplate("#content", "/static/templates/media.html", {media : res.data, user: Frack.CurrentUser});
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

        '/admin/redigera_nyhet/:id': function(params) {
            preloadTemplate("/static/templates/editpost.html");
            preloadTemplate("/static/templates/sidebar.html");
            Frack.News.GetByFilter("id=" + params.id).then(function(res) {
                renderTemplate("#content", "/static/templates/editpost.html", {article: res.data});
                renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "nyheter", user: Frack.CurrentUser});
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

        '/basecamp':function(){
            renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "basecamp", user: Frack.CurrentUser});
            renderTemplate("#content", "/static/templates/basecamp.html");
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

        '/logout': function() {
            Frack.Logout();
            Frack.Router.navigate("/");
        },

        '/admin/upload':function() {
            renderTemplate("#content", "/static/templates/upload.html");
            renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "admin", user: Frack.CurrentUser});
        },
        '/admin/upload_blandaren':function() {
            renderTemplate("#sidebar", "/static/templates/sidebar.html", {currentPage: "admin", user: Frack.CurrentUser});
            renderTemplate("#content", "/static/templates/blandaren_upload.html");
        }
    });

    Frack.Router.notFound(function (query) {
        renderTemplate("#page", "/static/templates/404.html");
    });

    Frack.Router.resolve();
});
