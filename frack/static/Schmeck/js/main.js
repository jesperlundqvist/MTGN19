function renderTemplate(selector, url, data) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);

    req.onload = () => {
        var source = req.responseText;
        var template = Handlebars.compile(source);

        $(selector).html(template(data));
    };

    req.send();
}

$(document).ready(function() {
    Frack.Router = new Navigo("http://localhost:5000");

    Frack.Router.on({
        '/nyhet/:id/': function(params, query) {
            Frack.News.GetById(params.id, function(data) {
                renderTemplate("#content", "/templates/article.html", {article: data});
            });
        },
        '/login': function() {
            renderTemplate("#page", "/templates/login.html");
        }
    });

    // Default
    Frack.Router.on(function() {
        Frack.News.GetAll(function(data) {
            renderTemplate("#content", "/templates/home.html", {news: data});
        });
    });

    Frack.Router.notFound(function (query) {
        renderTemplate("#content", "/templates/404.html", {});
    });

    Frack.Router.resolve();
});
