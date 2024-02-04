import { NavLink } from 'react-router-dom';
import { AuthButton } from '../auth';

import './Header.css';

const isSelected = ({ isActive }) => (isActive ? 'selected' : '');

function Header(props) {
  return (
    <header>
      Nodepop React
      <nav>
        <ul>
          <li>
            <NavLink to="/adverts" className={isSelected} end>
             {props.title}
            </NavLink>
          </li>
          <li>
            <NavLink to="/adverts/new" className={isSelected}>
            {props.list}
            </NavLink>
          </li>
        </ul>
      </nav>
      <AuthButton />
    </header>
  );
}

export default Header;
