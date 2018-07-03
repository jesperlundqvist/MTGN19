function renderTemplate(selector, url, data) {
    $.ajax({
        method: "GET",
        url: url
    }).done(function(responseData) {
        var template = Handlebars.compile(responseData);

        $(selector).html(template(data));
        Frack.Router.updatePageLinks();
    }).fail(function(res) {
        console.error(res);
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

    Frack.Router = new Navigo("http://mtgn18.azurewebsites.net/");

    Frack.Router.on({
        '/': function() {
            Frack.News.GetAll().done(function(data) {
                renderTemplate("#content", "/templates/nyheter.html", {news: data});
                renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "nyheter"});
            });
        },

        '/nyhet/:id/': function(params, query) {
            Frack.News.GetById(params.id).done(function(data) {
                renderTemplate("#content", "/templates/article.html", {article: data});
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

        '/media': function() {
            renderTemplate("#content", "/templates/media.html");
            renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "media"});
        },

        '/blandaren': function() {
            renderTemplate("#content", "/templates/blandaren.html");
            renderTemplate("#sidebar", "/templates/sidebar.html", {currentPage: "blandaren"});
        },

        '/login': function() {
            renderTemplate("#page", "/templates/login.html");
        }
    });

    Frack.Router.notFound(function (query) {
        renderTemplate("#page", "/templates/404.html");
    });

    Frack.Router.resolve();
});
