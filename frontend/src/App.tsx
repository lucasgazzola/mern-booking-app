import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom'

import Layout from './layouts/Layout'

import Register from './pages/Register'
import SingIn from './pages/SingIn'

function App() {
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
