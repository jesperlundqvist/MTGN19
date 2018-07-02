function renderTemplate(selector, url, data) {
    axios({
        method: "get",
        url: url
    }).then(function(response) {
        var source = response.data;
        var template = Handlebars.compile(source);

        $(selector).html(template(data));
    }).catch(function(error) {
        console.error(error);
    });
}

$(document).ready(function() {
    Frack.Router = new Navigo("http://localhost:5000");

    Frack.Router.on({
        '/': function() {
            Frack.News.GetAll().then(function(response) {
                renderTemplate("#content", "/templates/home.html", {news: response.data});
            });
        },

        '/nyhet/:id/': function(params, query) {
            Frack.News.GetById(params.id).then(function(response) {
                renderTemplate("#content", "/templates/article.html", {article: response.data});
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
