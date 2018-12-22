import React from "react";
import Books from "./pages/Books";
import Nav from "./components/Nav";
import Search from "./components/Search";
function App() {
  return (
    <div>
      <Search />
      <Nav />
      <Books />
    </div>
  );
}

export default App;
