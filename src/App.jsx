import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './Feed';
import AddBlog from './AddBlog';
import EditBlog from './EditBlog';
import BlogDetail from './BlogDetail';
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/add" element={<AddBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
