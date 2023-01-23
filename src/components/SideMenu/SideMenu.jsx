import './SideMenu.css';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';

import classnames from 'classnames';

function SideMenu({ isMenuDisplayed, buttonClick }) {
  const classNameSideMenu = classnames('side-menu', {
    'side-menu_opened': isMenuDisplayed,
  })
  const classNameSideMenuContainer = classnames('side-menu__container')

  return (
    <div className={classNameSideMenu}>
      <div className={classNameSideMenuContainer}>
        <button className="side-menu__button-close" onClick={buttonClick} />
        <div className="side-menu__nav-container">
          <Navigation />
          <Account />
        </div>
      </div>
    </div>
  )
}

export default SideMenu;
