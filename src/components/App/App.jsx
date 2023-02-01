import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

// импортируем все нужные компоненты
import './App.css'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import Main from '../Main/Main'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import NotFound from '../NotFound/NotFound'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import Login from '../Login/Login'

//временный набор данных для подключения api
import { cardsAll } from '../../utils/cards'

function App() {
  //переменные состояния
  const [currentUser, setCurrentUser] = useState({
    name: 'Просто царь',
    _id: 123,
    email: 'mail@mail.com',
  })
  //залогинен пользователь или нет
  const [loggedIn, setLoggedIn] = useState(false)
  //общая ушипка
  const [commonError, setCommonError] = useState('')
  //слайдер короткометражек
  const [isShortFilms, setIsShortFilms] = useState(false)
  //происходит ли поиск фильмов (отображает прелоадер)
  const [isLoading, setIsLoading] = useState(false)
  //если в результате поиска фильмов ничего не найдено
  const [isFound, setIsFound] = useState(true)
  //если в процессе поиска возникла ушипка
  const [isFailed, setIsFailed] = useState(false)
  //отслеживаем ширниу экрана
  const [width, setWidth] = useState(window.innerWidth)

  const navigate = useNavigate()

  //для проверки на этапе отсутствия Api
  const cards = cardsAll.slice(0, 100).map((item) => {
    if (item.id % 2 === 0) {
      item.owner = [123, 125]
    } else {
      item.owner = [124, 125]
    }
    return item
  })

  //отфильтрованные короткометражки
  const cardsFiltered = cards.filter((item) => {
    return item.duration <= 40
  })

  //определим количество выводимых карточек
  const cardsNumber = width > 1217 ? 12 : width > 690 ? 8 : 5
  const cardsMore = width > 1217 ? 3 : 2
  const [cardsForDisplay, setCardsForDisplay] = useState(
    cards.slice(0, cardsNumber),
  )

  //состояние кнопки еще
  const [isButtonMoreDispayed, setIsButtonMoreDispayed] = useState(
    cards.length > cardsForDisplay.length ? true : false,
  )

  //обработчик нажатия на кнопку еще
  function handleButtonMoreClick() {
    const cardsAmount = cardsForDisplay.length + cardsMore
    const cardsResult = isShortFilms ? cardsFiltered : cards
    if (cardsResult.length >= cardsAmount) {
      setCardsForDisplay(cardsResult.slice(0, cardsAmount))
    }
    if (cardsResult.length <= cardsAmount) {
      setIsButtonMoreDispayed(false)
    }
  }

  //обработчик нажатия на кнопку короткометражек
  function handleShortFilms() {
    const cardsResult = !isShortFilms ? cardsFiltered : cards
    setCardsForDisplay(cardsResult.slice(0, cardsNumber))
    setIsButtonMoreDispayed(
      cardsResult.length > cardsForDisplay.length ? true : false,
    )
  }

  //обработчик удаления фильма
  function handleDeleteFilm(cardForDelete) {
    cardForDelete = cardForDelete.owner.filter((item) => {
      return item !== currentUser._id
    })
  }

  //обработчик сохранения фильма
  function handleSaveFilm(cardForSave) {
    cardForSave.owner.push(currentUser._id)
  }

  // обработчик сабмита профиля
  function handleSubmitProfile(
    setIsSubmitButton,
    setIsDisabled,
    isChanged,
    values,
  ) {
    if (isChanged) {
      currentUser.name = values.name
      currentUser.email = values.email
      setCommonError('При обновлении профиля произошла ошибка.')
    }
    setIsSubmitButton(false)
    setIsDisabled(true)
  }

  // обработчик регистрации нового пользователя
  function handleSubmitRegistration(userData) {
    console.log(`registration userData=${userData}`)
  }

  // обработчик логина
  function handleSubmitLogin(userData) {
    console.log(`login userData=${userData}`)
  }

  // обработчик logout
  function onSignOut() {
    navigate('/')
  }

  //установим временную задержку для обработчика изменения разрешения экрана
  let timeOutFunctionId
  useEffect(() => {
    const handleResize = (event) => {
      clearTimeout(timeOutFunctionId)
      timeOutFunctionId = setTimeout(() => {
        setWidth(event.target.innerWidth)
      }, 300)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <CurrentUserContext.Provider value={{ currentUser, loggedIn, commonError }}>
      <Header onSignOut={onSignOut} />

      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route
          path="/profile"
          element={
            <Profile
              handleSubmitProfile={handleSubmitProfile}
              onSignOut={onSignOut}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Register handleSubmitRegistration={handleSubmitRegistration} />
          }
        />
        <Route
          path="/signin"
          element={<Login handleSubmitLogin={handleSubmitLogin} />}
        />
        <Route
          exact
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
            />
          }
        />
        <Route
          exact
          path="/saved-movies"
          element={
            <ProtectedRoute
              component={SavedMovies}
              isLoading={isLoading}
              isFound={isFound}
              isFailed={isFailed}
              cards={isShortFilms ? cardsFiltered : cards}
              isShortFilms={isShortFilms}
              setIsShortFilms={setIsShortFilms}
              handleShortFilms={handleShortFilms}
              handleDeleteFilm={handleDeleteFilm}
              handleSaveFilm={handleSaveFilm}
            />
          }
        />
        <Route exact path="/not-found" element={<NotFound />} />
        (//перенаправление всех других роутов)
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>

      <Footer />
    </CurrentUserContext.Provider>
  )
}

export default App
