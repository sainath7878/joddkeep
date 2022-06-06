import './App.css';
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { LandingPage, AuthorizationPage, NotesPage, ArchivePage, LabelPage, TrashPage, RestrictAuth, NotFound } from 'pages/index'
import { Header, Footer, Authorized, Sidebar, MainContainer } from "components/index"
import { useAuth } from 'context';
import { useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const { authState, authDispatch } = useAuth();
  const location = useLocation()
  const encodedToken = localStorage.getItem("token");
  useEffect(() => {
    if (encodedToken) {
      (async () => {
        try {
          const response = await axios.post("/api/auth/verify",
            { encodedToken }
          )
          if (response.status === 201) {
            authDispatch({
              type: "SET_USER", payload: {
                encodedToken, isLoggedIn: true, email: response.data.email,
                firstName: response.data.firstName,
              }
            })
          }
        }
        catch (err) {
          console.log(err)
        }
      })()

    }
  }, [])
  return (
    <div className="App">
      <Header />
      <ToastContainer theme="colored" autoClose={2000} position="top-right" className="fs-s" />
      <MainContainer>
        {location.pathname !== "/" && authState.isLoggedIn && <Sidebar />}
        <Routes>
          {location.pathname === "/"}
          <Route path="/" element={<LandingPage />} />
          <Route element={<Authorized />}>
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/label" element={<LabelPage />} />
            <Route path="/trash" element={<TrashPage />} />

          </Route>
          <Route element={<RestrictAuth />}>
            <Route path="/signin" element={<AuthorizationPage />} />
            <Route path="/signup" element={<AuthorizationPage />} />
          </Route>

          <Route path="/mockman" element={<Mockman />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </MainContainer>
      <Footer />
    </div>
  );
}

export default App;
