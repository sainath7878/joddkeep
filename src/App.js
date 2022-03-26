import './App.css';
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { LandingPage, AuthorizationPage } from 'pages/index'
import { Header, Footer } from "components/index"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<AuthorizationPage />} />
        <Route path="/signup" element={<AuthorizationPage />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
