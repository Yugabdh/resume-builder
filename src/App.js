import './assets/style/main.scss';
import { useState, useEffect } from 'react';
import { 
  HashRouter
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth, onAuthStateChanged } from './firebase';

import { login, logout } from './redux/userSlice';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import RoutesConfig from './Route';

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

// check at page load if a user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <>
      {!loading ? (
        <HashRouter>
          <NavbarComponent />
            <main>
              <RoutesConfig />
            </main>
          <FooterComponent />
        </HashRouter>
      ) : (
        <></>
      )}
    </>

  );
}

export default App;