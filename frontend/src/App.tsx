import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom'

import Layout from './layouts/Layout'

import useAppContext from './hooks/useAppContext'

import Register from './pages/Register'
import SingIn from './pages/SingIn'
import AddHotel from './pages/AddHotel'

function App() {
  const { isLoggedIn } = useAppContext()

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <div>Hello World</div>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SingIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
