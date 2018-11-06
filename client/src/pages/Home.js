import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios"
import { Row, Col, Container, Button } from "reactstrap";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import Carousel from "nuka-carousel";

// Components
import Search from "../components/Search";
import Login from "../components/Login";

// CSS
import "../css/Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: [],
      flashcard: [],
      search: false,
      notFound: false,
      showCards: false,
    };
  }

  searchTags = (event, tagInput) => {
    event.preventDefault();
    this.setState({
      search: true,
      notFound: false
    })
    // console.log("input: " +tagInput.replace(/\s/g, ''))
    axios.get("/decks/tags/" + tagInput.replace(/\s/g, ''))
      .then(response => {
        console.log(response.data)
        if (response.data === null || response.data.length === 0) {
          this.setState({
            notFound: true,
            decks: []
          });
        }
        else {
          console.log(response.data)
          this.setState({
            decks: response.data
          })
        }
      })
  }

  getFlashcards = (id) => {
    axios.get("/flashcard/" + id)
      .then(response => {
        this.setState({
          flashcard: response.data,
          showCards: true,
          search: false,
          notFound: false,
        })
      })
  }

  displayPublicDecks = () => {
    axios.get("/decks/public")
      .then(response => {
        this.setState({
          decks: response.data,
          showCards: false,
          search: true, 
        })
      })
  }


  render() {
    if (this.props.user) {
      return <Redirect to="/profile" />
    }

    let renderDecks;
    if (this.state.search) {
      if (this.state.notFound) {
        document.querySelector("#render-decks").style.height = "auto";
        document.querySelector("#render-decks").style.boxShadow = "";
        renderDecks =
          <div className="decks-not-found animated wobble">
          <i className="fas fa-binoculars" style={{fontSize: "200px", marginLeft: "4%", color: "#E34234"}}></i>
            <h3 style={{color: "#E34234"}}>Decks Not Found</h3>
          </div>
      }
      else if (!this.state.notFound) {
        document.querySelector("#render-decks").style.height = "700px";
        document.querySelector("#render-decks").style.boxShadow = "inset 0 0 10px #000000";
        renderDecks = this.state.decks.map((item, index) => {

          return (
            <Col key={item.id}>
              <div className="decks decks-primary animated bounceIn">
              <div className="h1-wrappers">
                <h1 className="deck-title text-center" onClick={() => this.getFlashcards(item.id)}>{item.subject}</h1>
                </div>
                <div className="tags-box">
                  {item.Tags.map(elem => {
                    return <button key={elem.id} className="tag-btn" onClick={(e) => this.searchTags(e, elem.tags)}>#{elem.tags} </button>
                  })}
                </div>
              </div>
            </Col>
          );
        });
      }
    }
    else if (this.state.showCards) {
      document.querySelector("#render-decks").style.height = "auto";
      document.querySelector("#render-decks").style.boxShadow = "";
      renderDecks =
        <div className="animated fadeIn" id="carousel">
          <Carousel
            // ref="cardList"
          >
            {this.state.flashcard.map(item => {
              return (
                <Flippy
                  key={item.id}
                  flipOnHover={false}
                  flipOnClick={true}
                  flipDirection="horizontal"
                  ref={r => (this.Flippy = r)}
                  style={{ width: "400px", height: "200px" }}
                >
                  <FrontSide style={{ backgroundColor: "#93bbde" }}>
                    <p>{item.front}</p>
                  </FrontSide>

                  <BackSide style={{ backgroundColor: "#66b361" }}>
                    <p>{item.back}</p>
                  </BackSide>
                </Flippy>
              );
            })}
          </Carousel>
          <Button color="warning" onClick={this.displayPublicDecks} style={{ marginLeft: "47%", fontSize: "170%"}}>
          <i className="fas fa-sign-out-alt"></i>
          </Button>
        </div>
    }
    return (
      <div>
        {this.props.user && <Redirect to="/profile" />}
        <nav className="navbar justify-content-between">
          <a href="https://github.com/do-kevin/Project-Three" target="_blank">
            <img id="app-logo" src={"http://now.outsystems.com/OutSystemsNowDocs/img/github.png?862"} alt="github logo"/>
          </a>
          <Login handleUserLogin={this.props.handleUserLogin} />
        </nav>
        <div className="jumbotron banner-image animated fadeIn">
          <div className="banner-text">
            <h1 className="display-1 app-name">Flash Me</h1>
            <br />
            <Search handleFunction={this.searchTags} />
          </div>
        </div>
        <div>
          <Row id="render-decks" className="animated fadeIn">
            {renderDecks}
          </Row>
        </div>
        
        <div className="container text-center">
        <h1 className="text-center display-3">Features</h1>
          <div className="row" style={{margin: "30px auto 0 auto"}}>
          <Container className="feature-containers">
            <div className="col">
              <div className="card feature-cards animated slideInLeft">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="fas fa-layer-group" />
                  </h1>
                  <h5 className="card-title">Flashcards</h5>
                  <p className="card-text text-left">
                    Create decks tied to specific tags. Type questions in each front of the flashcard and answers in the back, so you can flip them to study for a big, incoming exam.
                  </p>
                </div>
              </div>
            </div>
            </Container>
            <Container className="feature-containers">
            <div className="col">
              <div className="card feature-cards animated slideInRight">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="fas fa-feather" />
                  </h1>
                  <h5 className="card-title">Notes</h5>
                  <p className="card-text text-left">
                    Ideas and information swimming around in your head?
                    Capture all of them here. Type and save whatever you want, whether it's business or personal, for future reference. You can include URL, image, and video links.
                  </p>
                </div>
              </div>
            </div>
            </Container>
            <Container className="feature-containers">
            <div className="col">
              <div className="card feature-cards animated slideInLeft">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="fas fa-list" />
                  </h1>
                  <h5 className="card-title">Lists</h5>
                  <p className="card-text text-left">
                      Organize a list of To-Dos to prioritize what you intend to do for the day, week, month, whatever.
                  </p>
                </div>
              </div>
              <br />
            </div>
            </Container>
            <Container className="feature-containers">
            <div className="col">
              <br />
              <div className="card feature-cards animated slideInRight">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="far fa-calendar-alt" />
                  </h1>
                  <h5 className="card-title">Reminders</h5>
                  <p className="card-text text-left">
                      Select a time and day to send yourself a reminder about an upcoming event, so you don't panick or be a hurry.
                  </p>
                </div>
              </div>
              <br />
            </div>
            </Container>
            <Container className="feature-containers">
            <div className="col">
              <br />
              <div className="card feature-cards animated zoomIn">
                <div className="card-body feature-cards">
                  <h1>
                    <i className="far fa-comment" />
                  </h1>
                  <h5 className="card-title">SMS</h5>
                  <p className="card-text text-left">
                      A text messaging feature for decks of flashcards and reminders. Need a reminder sent to your phone? Want to send flashcard questions to keep your memory sharp? All you need to do is enter your phone number and turn those features on!
                  </p>
                </div>
              </div>
              <br />
            </div>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
