import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { makeServer } from './server'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, NotesProvider, TrashProvider, ArchiveProvider } from "context/index"

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <TrashProvider>
            <ArchiveProvider>
              <App />
            </ArchiveProvider>
          </TrashProvider>
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
