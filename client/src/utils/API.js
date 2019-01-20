import axios from "axios";

export default {
  // Gets all books
  getPosts: function() {
    return axios.get("/api/posts");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  savePost: function(postData) {
    return axios.post("/api/posts", postData);
  }
};
