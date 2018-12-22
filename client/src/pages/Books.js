import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    authors: "",
    description: "",
    image: "test",
    link: "test"
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", authors: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };

  postBooks = event => {
    event.preventDefault();
    let bookData = {
      title: this.state.title,
      authors: this.state.authors,
      description: this.state.description,
      image: "fake",
      link: "fake"
    };
    console.log(bookData);
    API.saveBook(bookData).then(API.getBooks());
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                name="title"
                value={this.state.title}
                placeholder="Title (required)"
                onChange={this.handleInputChange}
              />
              <Input
                name="authors"
                value={this.state.authors}
                placeholder="Author (required)"
                onChange={this.handleInputChange}
              />
              <TextArea
                name="description"
                value={this.state.description}
                placeholder="Synopsis (Optional)"
                onChange={this.handleInputChange}
              />
              <FormBtn onClick={this.postBooks}>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.authors}
                        </strong>
                      </a>
                      <DeleteBtn />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
