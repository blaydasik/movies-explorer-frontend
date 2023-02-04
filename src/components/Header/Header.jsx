import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import classnames from 'classnames'

import './Header.css'

import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import Navigation from './Navigation/Navigation'
import Account from './Account/Account'
import RegLog from './RegLog/RegLog'
import SideMenu from './SideMenu/SideMenu'

function Header({ onSignOut }) {
  //подпишемся на контекст
  const loggedIn = React.useContext(CurrentUserContext).loggedIn
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(false)

  //обработчик открытия бокового меню
  function handleBurgerButtonClick() {
    setIsMenuDisplayed(!isMenuDisplayed)
  }

  const location = useLocation()
  //определим, находимся ли мы на странице регистрации или входа
  const isSignInSignUp =
    location.pathname === '/signin' || location.pathname === '/signup'
  const isNotFound = location.pathname === '/not-found'
  const isMainPage = location.pathname === '/'
  const classNameHeader = classnames('header', {
    'header_main-page': isMainPage,
    'header_space-between': !loggedIn,
    header_inactive: isNotFound,
  })
  const classNameLogo = classnames('header__logo', {
    header__logo_centered: isSignInSignUp,
  })
  const classNameNavigation = classnames('header__navigation', {
    header__navigation_active: loggedIn && !isSignInSignUp,
  })
  const classNameRegLog = classnames('header__reg-log', {
    'header__reg-log_inactive': loggedIn || isSignInSignUp,
  })
  const classNameAccount = classnames('header__account', {
    header__account_inactive: !loggedIn || isSignInSignUp,
  })
  const classNameBurger = classnames('header__button-burger', {
    'header__button-burger_inactive': !loggedIn || isSignInSignUp,
  })

  return (
    <header className={classNameHeader}>
      <Link className={classNameLogo} to="/" />

      <nav className={classNameNavigation}>
        <Navigation
          isMenuDisplayed={isMenuDisplayed}
          buttonClick={handleBurgerButtonClick}
        />
      </nav>

      <nav className={classNameRegLog}>
        <RegLog />
      </nav>

      <nav className={classNameAccount}>
        <Account onSignOut={onSignOut} />
      </nav>

      <button className={classNameBurger} onClick={handleBurgerButtonClick} />

      <SideMenu
        isMenuDisplayed={isMenuDisplayed}
        buttonClick={handleBurgerButtonClick}
        onSignOut={onSignOut}
      />
    </header>
  )
}

export default Header
