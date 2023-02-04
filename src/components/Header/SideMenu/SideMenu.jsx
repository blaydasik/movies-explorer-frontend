import classnames from 'classnames'

import './SideMenu.css'

import Navigation from '../Navigation/Navigation'
import Account from '../Account/Account'

function SideMenu({ isMenuDisplayed, buttonClick, onSignOut }) {
  const classNameSideMenu = classnames('side-menu', {
    'side-menu_opened': isMenuDisplayed,
  })
  const classNameSideMenuContainer = classnames('side-menu__container')

  return (
    <section className={classNameSideMenu}>
      <div className={classNameSideMenuContainer}>
        <button className="side-menu__button-close" onClick={buttonClick} />
        <div className="side-menu__nav-container">
          <Navigation
            isMenuDisplayed={isMenuDisplayed}
            buttonClick={buttonClick}
          />
          <Account onSignOut={onSignOut}/>
        </div>
      </div>
    </section>
  )
}

export default SideMenu
