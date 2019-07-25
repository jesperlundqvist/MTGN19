import React, { Component } from "react";
import "./Admin.css"
class Inlagg extends Component {
    state = {};

   /* loadScript = (url, callback) => {
    var script = document.createElement("script")
    script.type = "text/javascript";
    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

loadScript("https://cdn.quilljs.com/1.3.6/quill.js", function () {
    var quill = new Quill('#quilleditor', {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                ['link', 'image', 'video'],
                ['noll']
            ]
        },
        theme: 'snow'
    });

    var noll_button = document.querySelector('.ql-noll');
    noll_button.innerHTML = "<span style='color:#444; font-weight: bold;'>Ø</span>"
    noll_button.addEventListener('click', function () {
        var selection = quill.getSelection();
        if (selection) {
            quill.insertText(selection, "Ø");
        }
    });

    var toolbar = quill.getModule('toolbar');
    toolbar.addHandler('link', function () {
        var selection = quill.getSelection();
        if (selection) {
            var href = prompt('Länk:')
            if (selection.length > 0) {
                quill.format('link', href);
            }
            else {
                quill.insertText(selection.index, href, { "link": href });
            }
        }
    });

    toolbar.addHandler('image', function () {
        var selection = quill.getSelection();
        if (selection) {
            var href = prompt('Länk till bilden:')
            if (href) {
                quill.insertEmbed(selection.index, 'image', href);
            }
        }
    });

    var form = document.querySelector('#news_input_form');
    form.onsubmit = function (e) {
        e.preventDefault();

        Frack.News.New({ headline: $("#titleeditor").val(), text: quill.container.firstChild.innerHTML, tags: "" }).then(function (res) {
            Frack.Router.navigate("/nyheter/" + res.data.id);
        });
    };
});*/

render() {
    return (
        <div className="page">
            <h1 className="view_header">Skapa inlägg</h1>
            <form id="news_input_form">
                <input id="titleeditor" type="text" className="form-control" placeholder="Rubrik" />
                <br />
                <div id="quilleditor">
                </div>
                <br />
                <input type="submit" className="btn btn-primary" value="Skapa nytt inlägg" />
            </form>

        </div>
    );
}
}

export default Inlagg;
