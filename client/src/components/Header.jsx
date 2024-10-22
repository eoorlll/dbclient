import { useDispatch, useSelector } from 'react-redux';
import {
    signOutSuccess
} from "../redux/user/userSlice";
import {
  breakConnection
} from "../redux/database/databaseSlice";
import '../assets/scss/components/header.scss'

const Header = () => {

    const { currentUser } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const handleSignOut = async () => {
        try {
          const res = await fetch(`/api/user/signout`, {
            method: "POST",
          });
    
          const data = await res.json();
    
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signOutSuccess());
            dispatch(breakConnection())
          }
    
        } catch (error) {
          console.log(error.message);
        }
    };

    return (
        <div className="site-header">
            <div className="site-header__container">
                <div className="site-header__logo">Database Manager</div>
                <div className="site-header__user-wrap">
                    <div className="site-header__user-name">Hi, {currentUser.userName}!</div>
                    <div className="site-header__user-logout" onClick={handleSignOut}>Sign out</div>
                </div>
            </div>
        </div>
    )
}

export default Header