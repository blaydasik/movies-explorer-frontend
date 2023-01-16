import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// импортируем все нужные компоненты
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

//переменные состояния
const [currentUser, setCurrentUser] = useState({});
const [loggedIn, setLoggedIn] = useState(false);

  return (
    <CurrentUserContext.Provider value={{ currentUser, loggedIn }}>
      <Header></Header>
      <Main></Main>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
