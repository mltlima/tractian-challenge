import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Home from './pages/home';
import AuthProvider from "./contexts/authContext";



function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

export default App;
