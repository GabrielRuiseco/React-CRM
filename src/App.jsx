import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Home from "./pages/Home";
import NewClient from "./pages/NewClient";
import EditClient from "./pages/EditClient";
import ShowClient from './pages/ShowClient';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="clients" element={<Home />} />
          <Route path="newClient" element={<NewClient />} />
          <Route path="editClient/:id" element={<EditClient />} />
          <Route path="clients/:id" element={<ShowClient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
