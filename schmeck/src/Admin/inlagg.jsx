import React, { Component } from "react";
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";
import '../News/News.css'
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

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        editorHtml: this.props.location.state.text,
        header: this.props.location.state.header
      });
    }
    /*var range = this.getSelection();
    var value = prompt('What is the image URL');
    if(value){
        this.quill.insertEmbed(range.index, 'image', value, this.sources.USER);
    }*/
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
          <CustomToolbar />
          <ReactQuill
            style={{ background: "#fff" }}
            theme={this.state.theme}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Inlagg.modules}
            formats={Inlagg.formats}
            bounds={".app"}
            placeholder={"text..."}
          />

          <input type='submit' />
        </form>
      </div>
    );
  }
}

const CustomToolbar = () => (
  <div id="toolbar" style={{background: "#b98d44"}}>
    <select className="ql-size">
      <option value="small">S</option>
      <option value="medium">M</option>
      <option value="large">L</option>
    </select>
    <select className="ql-align" />
    <select className="ql-color" />
    <select className="ql-background" />
    <button className="ql-link"></button>
    <button className="ql-image"></button>
    <button className="ql-video"></button>
    <button className="ql-insertHeart">
        <span>Ø</span>
    </button>
  </div>
)
/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Inlagg.modules = {
  toolbar: {
    container: /*[
    // [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [
      {
        color: [
          "#000000",
          "#ffffff",
          "#ff0000",
          "#ffff00",
          "#00ff00",
          "#00ffff",
          "#0000ff",
          "#bbbbbb",
          "#bb0000",
          "#bbbb00",
          "#00bb00",
          "#00bbbb",
          "#0000bb",
          "#888888",
          "#880000",
          "#888800",
          "#008800",
          "#008888",
          "#000088",
          "#444444",
          "#440000",
          "#444400",
          "#004400",
          "#004444",
          "#000044"
        ]
      },
      {
        background: [
          "#000000",
          "#ffffff",
          "#ff0000",
          "#ffff00",
          "#00ff00",
          "#00ffff",
          "#0000ff",
          "#bbbbbb",
          "#bb0000",
          "#bbbb00",
          "#00bb00",
          "#00bbbb",
          "#0000bb",
          "#888888",
          "#880000",
          "#888800",
          "#008800",
          "#008888",
          "#000088",
          "#444444",
          "#440000",
          "#444400",
          "#004400",
          "#004444",
          "#000044"
        ]
      }
    ], [
      { list: "ordered" },
      { list: "bullet" }
    ],
    [{ 'align': [] }],
    ["link", "image", "video"],
    
  ]*/"#toolbar",
  handlers: {
    insertHeart: insertHeart,
    image: imageHandler
  }
},
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

function imageHandler() {
  var range = this.quill.getSelection();
  var value = prompt('What is the image URL');
  if (value) {
    this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
  }
}

function insertHeart() {
  console.log("hej <3")
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "Ø");
  this.quill.setSelection(cursorPosition + 1);
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Inlagg.formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "align",
  "background"
];



export default Inlagg;
