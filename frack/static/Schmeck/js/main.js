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
    var router = new Navigo();

    router.on({
        '': function () {
            Frack.News.GetAll(function(data) {
                renderTemplate("#content", "/templates/home.html", {news: data});
            });
        },
        '/login': function() {
            renderTemplate("#content", "/templates/login.html");
        }
    }).resolve();
});
