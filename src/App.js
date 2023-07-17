import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Publicroutes from "./components/auth/Publicroutes";
import Protectedroutes from "./components/auth/Protectedroutes";
import NavBar from "./components/NavBar";
import Authors from "./Pages/Authors";
import AddAuthor from "./Pages/AddAuthor";
import Genres from "./Pages/Genres";
import AddGenres from "./Pages/AddGenres";
import Dashboard from "./Pages/Dashboard";
import AddBook from "./Pages/AddBook";
import ViewBook from "./Pages/ViewBook";
import ViewAuthor from "./Pages/ViewAuthor";
import ViewGenres from "./Pages/ViewGenres";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route element={<Publicroutes />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<Protectedroutes />}>
            <Route path="/" element={<Dashboard />} />

            <Route path="/create/:bookId?" element={<AddBook />} />
            <Route path="/viewbook/:bookId" element={<ViewBook />} />

            <Route path="/authors" element={<Authors />} />
            <Route path="/authors/create/:authorId?" element={<AddAuthor />} />
            <Route path="/viewauthor/:authorId" element={<ViewAuthor />} />

            <Route path="/genres" element={<Genres />} />
            <Route path="/genres/create/:genreId?" element={<AddGenres />} />
            <Route path="/viewgenre/:genreId" element={<ViewGenres />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
