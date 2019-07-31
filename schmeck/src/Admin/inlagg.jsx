import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Frack from "../Frack";
import "./Admin.css";
class Inlagg extends Component {
  /*
   * Simple editor component that takes placeholder text as a prop
   */
  constructor(props) {
    super(props);
    this.state = { editorHtml: "", theme: "snow", header: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.header);
    let data = {
      author: Frack.CurrentUser,
      headline: event.target.header.value,
      tags: "",
      text: this.state.editorHtml
    };

    Frack.News.New(data).then(res => {
      this.props.history.push("/nyheter");
    });
  };

  handelHederChange = text => {
    this.setState({ header: text.value });
  };

  render() {
    return (
      <div className='page'>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='header' placeholder='Rubrik' />
          <ReactQuill
            style={{ background: "#fff" }}
            theme={this.state.theme}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Inlagg.modules}
            formats={Inlagg.formats}
            bounds={".app"}
            placeholder={this.props.placeholder}
          />
          <input type='submit' />
        </form>
      </div>
    );
  }
}


/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Inlagg.modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    [{ 'color': ['#000000', '#ffffff', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff',
                 '#bbbbbb', '#bb0000', '#bbbb00', '#00bb00', '#00bbbb', '#0000bb',
                 '#888888', '#880000', '#888800', '#008800', '#008888', '#000088',
                 '#444444', '#440000', '#444400', '#004400', '#004444', '#000044']}],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Inlagg.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  'color'
];

Inlagg.propTypes = {
  placeholder: "text..."
};


/* state = {};

    loadScript = (url, callback) => {
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
});

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
}*/

export default Inlagg;
