import './App.css';
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { LandingPage, AuthorizationPage, NotesPage, ArchivePage, LabelPage, TrashPage, RestrictAuth, NotFound } from 'pages/index'
import { Header, Footer, Authorized, Sidebar, MainContainer, Toast } from "components/index"
import { useAuth } from 'context';
import { useLocation } from "react-router-dom";

function App() {
  const { authState } = useAuth();
  const location = useLocation()
  return (
    <div className="App">
      <Header />
      {authState.toast.toastState && <Toast />}
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
