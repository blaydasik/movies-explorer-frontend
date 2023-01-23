import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// импортируем все нужные компоненты
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from "../NotFound/NotFound";

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

//переменные состояния
const [currentUser, setCurrentUser] = useState({});
const [loggedIn, setLoggedIn] = useState(true);

  return (
    <CurrentUserContext.Provider value={{ currentUser, loggedIn }}>
      <Header        
        loggedIn={loggedIn}
      />

      <Routes>
        <Route
          exact path="/"
          element={
              <ProtectedRoute
                component={Main}
              />
          }
        />

        <Route
          exact path="/not-found"
          element={<NotFound />}
        />

        (//перенаправление всех других роутов)
         <Route
          path="*"
          element={
            <Navigate to="/not-found" />
          }
        />

      </Routes>

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
