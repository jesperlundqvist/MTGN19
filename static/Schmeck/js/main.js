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

    Frack.Router.on({
        '/': function() {
            Frack.News.GetAll().then(function(res) {
                renderTemplate("#content", "/templates/nyheter.html", {news: res.data});
                renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "nyheter"});
            });
        },

        '/nyhet/:id/': function(params, query) {
            Frack.News.GetByFilter("id=" + params.id).then(function(res) {
                renderTemplate("#content", "/templates/article.html", {article: res.data});
                renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "nyheter"});
            });
        },

        '/schema': function() {
            renderTemplate("#content", "/templates/schema.html");
            renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "schema"});
        },

        '/profiler': function() {
            renderTemplate("#content", "/templates/profiler.html");
            renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "profiler"});
        },

        '/media': function(params, query) {
            renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "media"});

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
