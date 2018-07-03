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
Handlebars.registerHelper('ifCond', function(v1, v2, options) {
    if (v1 === v2){
        return options.fn(this);
    }
    return options.inverse(this);
});

$(document).ready(function() {
    Frack.Router = new Navigo("http://localhost:5000");

    Frack.Router.on({
        '/': function() {
            Frack.News.GetAll().done(function(data) {
                renderTemplate("#content", "/templates/home.html", {news: data});
            });
        },
        '/media': function(params, query){
            console.log(query);
            if(query == ""){
                Frack.Media.GetAll().done(function(data) {
                    renderTemplate("#content", "/templates/media.html", {media : data});
                })
            }else{
                Frack.Media.GetByFilter(query).done(function(data){
                    renderTemplate("#content", "/templates/media.html", {media : data});
                })
            }
        },

        '/nyhet/:id/': function(params, query) {
            Frack.News.GetByFilter(params.id).done(function(data) {
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
