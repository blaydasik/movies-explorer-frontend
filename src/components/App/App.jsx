import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

//  импортируем все нужные компоненты
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Main from "../Main/Main.jsx";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import {
  ProtectedRoute,
  UnProtectedRoute,
} from "../ProtectedRoute/ProtectedRoute.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import Movies from "../Movies/Movies.jsx";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";

// импортируем api
import beatFilmsApi from "../../utils/MoviesApi";
import workingApi from "../../utils/MainApi";
import * as auth from "../../utils/auth";

// импортируем вспомогательные функции
import {
  filterCardsByString,
  filterCardsByShorts,
  amountCardsToView,
} from "../../utils/constants";

function App() {
  // переменные состояния
  const [currentUser, setCurrentUser] = useState({});
  // проверим локальное хранилище
  const moviesFromLocalStorage =
    JSON.parse(localStorage.getItem("filteredCards")) || [];
  const textForSearchFromLocalStorage =
    localStorage.getItem("textForSearch") || false;
  const isShortFilmsFromLocalStorage =
    JSON.parse(localStorage.getItem("isShortFilms")) || false;
  // залогинен пользователь или нет
  const [loggedIn, setLoggedIn] = useState(true);
  // общая ушипка
  const [commonError, setCommonError] = useState("");
  // слайдер короткометражек
  const [isShortFilms, setIsShortFilms] = useState(false);
  // происходит ли поиск фильмов (отображает прелоадер)
  const [isLoading, setIsLoading] = useState(false);
  // если в результате поиска фильмов ничего не найдено
  const [isFound, setIsFound] = useState(true);
  // если в процессе поиска возникла ушипка
  const [isFailed, setIsFailed] = useState(false);
  // отслеживаем ширниу экрана
  const [width, setWidth] = useState(window.innerWidth);
  // состояние popup с ошибкой apiscreenWidth
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  // определяет успешно ли отработало api
  const [isSuccess, setIsSucess] = useState(false);
  const [message, setMessage] = useState("");
  // определим первый ли раз производится поиск
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  // массив карточек, полученных с сервера при первом поиске
  const [cards, setCards] = useState([]);
  // состояние кнопки еще
  const [isButtonMoreDispayed, setIsButtonMoreDispayed] = useState(false);
  // массив отображаемых карточек
  const [cardsForDisplay, setCardsForDisplay] = useState([]);
  // отфильтрованные по условиям поиска
  const [cardsFiltered, setCardsFiltered] = useState(moviesFromLocalStorage);
  // сохраненные данным пользователем карточки
  const [savedCards, setSavedCards] = useState([]);
  // отфильтрованные по условиям поиска сохраненные данным пользователем карточки
  const [savedCardsFiltered, setSavedCardsFiltered] = useState([]);
  // массив отображаемых сохраненных карточек c учетом условий фильтрации
  const [savedCardsForDisplay, setSavedCardsForDisplay] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const isLocationMovies = location.pathname === "/movies";

  React.useEffect(() => {
    if (loggedIn) {
      workingApi
        .downloadMovieCards()
        .then((cardsData) => {
          setSavedCards(cardsData);
          setSavedCardsFiltered(cardsData);
          setSavedCardsForDisplay(cardsData);
        })
        .catch((err) => {
          setMessage(
            `Ушипка при загрузке сохраненных карточек с сервера: ${err.message}`
          );
          setIsInfoTooltipPopupOpen(true);
        });

      // установим данные из локального хранилища для роута movies
      if (isLocationMovies) {
        if (isFirstSearch) {
          setIsFound(true);
        } else {
          setIsFound(
            filterCardsByShorts(
              moviesFromLocalStorage,
              isShortFilmsFromLocalStorage
            ).length > 0
          );
        }
        setIsShortFilms(isShortFilmsFromLocalStorage);
        setCardsForDisplay(() =>
          textForSearchFromLocalStorage
            ? filterCardsByShorts(
                moviesFromLocalStorage,
                isShortFilmsFromLocalStorage
              ).slice(0, amountCardsToView(width).cards)
            : []
        );
        if (moviesFromLocalStorage.length > amountCardsToView(width).cards) {
          setIsButtonMoreDispayed(true);
        } else {
          setIsButtonMoreDispayed(false);
        }
      } else {
        setIsShortFilms(false);
        setIsFound(savedCards.length > 0);
      }
      setCommonError("");
    }
  }, [location]);

  // обработчик нажатия на кнопку еще
  function handleButtonMoreClick() {
    const cardsAmount = cardsForDisplay.length + amountCardsToView(width).more;
    const cardsResult = filterCardsByShorts(cardsFiltered, isShortFilms);
    if (cardsResult.length > cardsForDisplay.length) {
      setCardsForDisplay(cardsResult.slice(0, cardsAmount));
    }
    if (cardsAmount >= cardsResult.length) {
      setIsButtonMoreDispayed(false);
    }
  }

  // обработчик нажатия на кнопку короткометражек
  function handleShortFilms() {
    console.log(isLocationMovies);
    if (isLocationMovies) {
      const cardsResult = filterCardsByShorts(cardsFiltered, !isShortFilms);
      setCardsForDisplay(cardsResult.slice(0, amountCardsToView(width).cards));
      if (cardsResult.length > 0) {
        setIsButtonMoreDispayed(
          cardsResult.length >
            cardsResult.slice(0, amountCardsToView(width).cards).length
        );
        setIsFound(true);
      } else {
        setIsButtonMoreDispayed(false);
        setIsFound(false);
      }
      localStorage.setItem("isShortFilms", !isShortFilms);
      localStorage.setItem("isFound", isFound);
    } else {
      const shortFilteredCards = filterCardsByShorts(
        savedCardsFiltered,
        !isShortFilms
      );
      setSavedCardsForDisplay(shortFilteredCards);
      setIsFound(shortFilteredCards.length > 0);
    }
  }

  // функция фильтрации фильмов
  function chooseFilms(cardsFilms, textForSearch) {
    // отфильтрованные по поиску карточки
    const filteredCards = filterCardsByString(cardsFilms, textForSearch);
    setCardsFiltered(filteredCards);
    // отфильтрованные карточки с учетом положения слайдера
    const shortFilteredCards = filterCardsByShorts(filteredCards, isShortFilms);
    setCardsForDisplay(
      shortFilteredCards.slice(0, amountCardsToView(width).cards)
    );
    if (shortFilteredCards.length > 0) {
      setIsFound(true);
      setIsButtonMoreDispayed(
        shortFilteredCards.length >
          shortFilteredCards.slice(0, amountCardsToView(width).cards).length
      );
    } else {
      setIsButtonMoreDispayed(false);
      setIsFound(false);
    }
    // сохраним результат в хранилище
    localStorage.setItem("textForSearch", textForSearch);
    localStorage.setItem("filteredCards", JSON.stringify(filteredCards));
    localStorage.setItem("isShortFilms", isShortFilms);
  }

  // обработчик запроса поиска фильма
  function handleSearchFilm(textForSearch) {
    if (isFirstSearch) {
      setIsLoading(true);
      setIsFailed(false);
      setIsFound(true);
      beatFilmsApi
        .downloadMoviesCards()
        .then((fullCards) =>
          Promise.all(beatFilmsApi.filterCardsInformation(fullCards))
        )
        .then((result) => {
          setCards(result);
          chooseFilms(result, textForSearch);
          setIsFirstSearch(false);
        })
        .catch(() => {
          setIsFound(true);
          setIsFailed(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      chooseFilms(cards, textForSearch);
      setIsLoading(false);
    }
  }

  // обработчик поиска сохраненного фильма
  function handleSearchSavedFilm(textForSearch) {
    setIsLoading(true);
    const filteredCards = filterCardsByString(savedCards, textForSearch);
    setSavedCardsFiltered(filteredCards);
    // отфильтрованные карточки с учетом положения слайдера
    const shortFilteredCards = filterCardsByShorts(filteredCards, isShortFilms);
    setSavedCardsForDisplay(shortFilteredCards);
    if (shortFilteredCards.length > 0) {
      setIsFound(true);
    } else {
      setIsFound(false);
    }
    setIsLoading(false);
  }

  //  обработчик регистрации нового пользователя
  function handleSubmitRegistration(userData) {
    setCommonError("");
    auth
      .register(userData)
      .then(() => {
        setMessage("Вы успешно зарегистрировались!");
        setIsSucess(true);
        setIsInfoTooltipPopupOpen(true);
        auth
          .login({ email: userData.email, password: userData.password })
          .then((authData) => {
            if (authData.token) {
              setLoggedIn(true);
              navigate("/movies");
            }
          });
      })
      .catch((err) => {
        const errMessage =
          err.message === "Validation failed"
            ? "При регистрации пользователя произошла ошибка."
            : err.message;
        setCommonError(errMessage);
        setLoggedIn(false);
      });
  }

  //  обработчик логина
  function handleSubmitLogin(userData) {
    setCommonError("");
    auth
      .login(userData)
      .then((data) => {
        // проверим, что токен получен
        if (data.token) {
          setMessage("Вы успешно авторизовались!");
          setIsSucess(true);
          setLoggedIn(true);
          setIsInfoTooltipPopupOpen(true);
          navigate("/movies");
        }
      })
      .catch((err) => {
        const errMessage =
          err.message === "Validation failed"
            ? "При логине произошла ошибка."
            : err.message;
        setCommonError(errMessage);
        setLoggedIn(false);
      });
  }

  // обработчик выхода из аккаунта
  function onSignOut() {
    auth
      .logout()
      .then((answer) => {
        setMessage(answer.message);
        setIsSucess(true);
        setIsInfoTooltipPopupOpen(true);
        setLoggedIn(false);
        setCurrentUser({});
        localStorage.clear();
      })
      .catch((err) => {
        setIsSucess(false);
        setMessage(`Что-то пошло не так: ${err.message}`);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  //  обработчик сабмита профиля
  function handleSubmitProfile(setIsSubmitButton, setIsDisabled, userData) {
    setCommonError("");
    workingApi
      .setNewUserInfo({ name: userData.name, email: userData.email })
      .then((updateData) => {
        setMessage("Данные профиля успешно обновлены!");
        setIsSucess(true);
        setIsInfoTooltipPopupOpen(true);
        setCurrentUser(updateData);
        setIsSubmitButton(false);
        setIsDisabled(true);
      })
      .catch((err) => {
        if (err === 409) {
          setCommonError("Пользователь с таким email уже существует! :-(");
        } else {
          setCommonError("При обновлении профиля произошла ошибка.");
        }
        setCurrentUser(currentUser);
      });
  }

  // эффект при загрузке страницы для проверки наличия валидной куки
  useEffect(() => {
    auth
      .checkCookies()
      .then((userData) => {
        if (userData) {
          // авторизуем пользователя
          setCurrentUser(userData);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        if (err.message !== "Отсутствует кука :-(") {
          setMessage(err.message);
          setIsInfoTooltipPopupOpen(true);
        }
        setLoggedIn(false);
      });
  }, [loggedIn]);

  // обработчик удаления фильма
  function handleDeleteFilm(cardForDelete) {
    const cardToDelete = savedCards.filter(
      (item) =>
        item.movieId === cardForDelete.movieId && item.owner === currentUser._id
    );
    cardToDelete.forEach((element) => {
      workingApi
        .deleteMovieCard(element._id)
        .then(() => {
          // обновим массив карточек
          setSavedCards(savedCards.filter((item) => item._id !== element._id));
        })
        .catch((err) => {
          if (err === 401) {
            setLoggedIn(false);
            setCurrentUser({});
            localStorage.clear();
          } else {
            setMessage(
              `Ушипка при попытке удалить карточку с сервера: ${err.message}`
            );
            setIsInfoTooltipPopupOpen(true);
          }
        });
    });
  }

  // обработчик сохранения фильма
  function handleSaveFilm(cardForSave) {
    workingApi
      .saveNewMovieCard(cardForSave)
      .then((newCard) => {
        // обновим массив карточек
        setSavedCards([...savedCards, newCard]);
      })
      .catch((err) => {
        if (err === 401) {
          setLoggedIn(false);
          setCurrentUser({});
          localStorage.clear();
        } else {
          setMessage(
            `Ушипка при попытке сохранить карточку на сервер: ${err.message}`
          );
          setIsInfoTooltipPopupOpen(true);
        }
      });
  }

  // обработчик вывода попапа с ошибкой api
  function handleInfoTooltip() {
    setIsInfoTooltipPopupOpen(!isInfoTooltipPopupOpen);
    setMessage("");
  }

  // установим временную задержку для обработчика изменения разрешения экрана
  let timeOutFunctionId;
  useEffect(() => {
    const handleResize = (event) => {
      clearTimeout(timeOutFunctionId);
      timeOutFunctionId = setTimeout(() => {
        setWidth(event.target.innerWidth);
      }, 300);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // навешивание обработчика на нажатие клавиши Escape
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        setIsInfoTooltipPopupOpen(false);
      }
    }
    if (isInfoTooltipPopupOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      // удаляем при закрытии
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
    return () => {};
  }, [isInfoTooltipPopupOpen]); // отслеживаем открытия и закрытия попапа

  return (
    <CurrentUserContext.Provider value={{ currentUser, loggedIn, commonError }}>
      <Header onSignOut={onSignOut} />

      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route
          path="/signup"
          element={
            <UnProtectedRoute
              component={Register}
              handleSubmitRegistration={handleSubmitRegistration}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <UnProtectedRoute
              component={Login}
              handleSubmitLogin={handleSubmitLogin}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              component={Profile}
              handleSubmitProfile={handleSubmitProfile}
              onSignOut={onSignOut}
            />
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute
              component={Movies}
              isLoading={isLoading}
              isFound={isFound}
              isFailed={isFailed}
              cards={cardsForDisplay}
              isButtonMoreDispayed={isButtonMoreDispayed}
              handleButtonMoreClick={handleButtonMoreClick}
              isShortFilms={isShortFilms}
              setIsShortFilms={setIsShortFilms}
              handleShortFilms={handleShortFilms}
              handleDeleteFilm={handleDeleteFilm}
              handleSaveFilm={handleSaveFilm}
              handleSearchFilm={handleSearchFilm}
              savedTextForSearch={textForSearchFromLocalStorage}
              savedCards={savedCards}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute
              component={SavedMovies}
              isLoading={isLoading}
              isFound={isFound}
              isFailed={isFailed}
              cards={savedCardsForDisplay}
              isShortFilms={isShortFilms}
              setIsShortFilms={setIsShortFilms}
              handleShortFilms={handleShortFilms}
              handleDeleteFilm={handleDeleteFilm}
              handleSearchSavedFilm={handleSearchSavedFilm}
              savedCards={savedCards}
            />
          }
        />
        <Route path="/not-found" element={<NotFound />} />
        (// перенаправление всех других роутов)
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>

      <Footer />

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={handleInfoTooltip}
        isSuccess={isSuccess}
        message={message}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
