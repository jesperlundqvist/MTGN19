function renderTemplate(selector, url, data) {
    $.ajax({
        method: "GET",
        url: url
    }).done(function(responseData) {
        var template = Handlebars.compile(responseData);

        $(selector).html(template(data));
    }).fail(function(res) {
        console.error(res);
    });
}

$(document).ready(function() {
    Frack.Router = new Navigo("http://localhost:5000");

    Frack.Router.on({
        '/': function() {
            Frack.News.GetAll().done(function(data) {
                renderTemplate("#content", "/templates/home.html", {news: data});
            });
        },

        '/nyhet/:id/': function(params, query) {
            Frack.News.GetById(params.id).done(function(data) {
                renderTemplate("#content", "/templates/article.html", {article: data});
            });
        },
        '/login': function() {
            renderTemplate("#page", "/templates/login.html");
        }
    });

    Frack.Router.notFound(function (query) {
        renderTemplate("#content", "/templates/404.html", {});
    });

    Frack.Router.resolve();
});
