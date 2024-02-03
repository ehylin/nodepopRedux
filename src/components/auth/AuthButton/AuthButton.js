import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import Button from '../../../components/shared/Button';


import { logout } from '../service';
import { authLogout } from '../../../store/action';


function AuthButton({ className, onLogout, isLogged }) {
  


  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };
  return isLogged ? (
    <Button onClick={handleLogoutClick} className={className}>
      Logout
    </Button>
  ) : (
    <Button as={Link} to="/login" $variant="primary" className={className}>
      Login
    </Button>
  );
}


const mapStateToProps = (state) => ({
  isLogged: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  onLogout: authLogout,
};


export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
