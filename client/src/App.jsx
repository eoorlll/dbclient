import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './assets/scss/App.scss';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={ <Home/>  } />
          </Route>
          <Route path='/sign-in' element={ <SignIn/> } />
          <Route path='/sign-up' element={ <SignUp/>  } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
