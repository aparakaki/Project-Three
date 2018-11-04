import React from "react";
import ReactQuill, { Quill } from "react-quill";
import {Button} from "reactstrap";
import moment from "moment";
import axios from "axios";

// Components
import Sidebar from "../components/Sidebar";


// CSS
import "../css/Notes.css";

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      note: "",
      notesArr: [],
      userId: JSON.parse(localStorage.getItem("user")).id,
      timeNdate: moment().format("ddd, MMMM Do YYYY, h:mm:ss a")
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveNote = this.saveNote.bind(this);
  }
  

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image", "video", "code-block"],
    ],
    keyboard:   { 
        bindings:   [
            {tab: false}
        ]
    }
  };

  formats = [
    "header",
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
    "code-block"
  ];

  handleChange(value) {
    this.setState({ text: value });
    console.log(this.state.text)
  }

  getNotes = () => {
    axios.get(`/notes/users/${this.state.userId}`).then((response) => {
      this.setState({
        noteArr: [...response.data]
      })
      console.log(this.state.notesArr);
    })
  }

  createNote = () => {
    console.log("Creating Note");
    axios.post(`/notes/${this.state.userId}`, { note: this.state.note }).then((response) => {
      console.log(response);
    });
    this.getNotes();
  }

  saveNote = (event) => {
    event.preventDefault();
    console.log("Save note button pressed")
    this.setState({ note: this.state.text });
    console.log("Saved Note:\n", this.state.note)
    this.createNote();
  };

  deleteNote = (id) => {
    axios.delete(`/notes/${id}`).then((response) => {
      this.getNotes();
    });
  }

  componentDidMount() {
    this.getNotes();
  }

  render() {
    return (
      <div style={{scrollBehavior: "smooth"}}>
        <Sidebar />
        <a href="#save-note-btn" style={{marginLeft: "90%"}}><i className="fas fa-chevron-circle-down animated slideInDown" style={{fontSize: "50px", color: "#FFD300"}}></i></a>
        {this.state.notesArr.map((item, index) => {
          return (
              <div key={item.id} className="animated slideInRight note-output">
                <Button color="danger" type="button" onClick={ () => this.deleteNote(item.id) }></Button>
                <div dangerouslySetInnerHTML={{ __html: this.state.notesArr[index] }} style={{ wordBreak: "break-word"}}></div> 
              </div>
          );
        })}

        {/* {
        <div className="animated slideInRight note-output">
          <h6 style={{ textAlign: "left"}}>{this.state.timeNdate}</h6>
          <div dangerouslySetInnerHTML={{ __html: this.state.note }} style={{ wordBreak: "break-word"}}></div> 
        </div>
        } */}

        <div id="quill-wrapper" className="text-center">
          <h1>Notes</h1>
          <p>*To create an <strong>embed link</strong>: Highlight a typed text, click the link button, and save the url</p>
          <ReactQuill
            theme="snow"
            id="quill-input"
            value={this.state.text}
            onChange={this.handleChange}
            modules={this.modules}
            formats={this.formats}
          />
        <Button id="save-note-btn" color="primary" onClick={this.saveNote} style={{ margin : "70px 0 30px 0" }}> Save Note </Button>

        </div>
      </div>
    );
  }
}

export default Note;
