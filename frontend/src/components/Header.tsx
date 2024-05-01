import { Link, useLocation } from 'react-router-dom'

import useAppContext from '../hooks/useAppContext'
import SignOutButton from './SignOutButton'

const Header = () => {
  const location = useLocation()
  console.log(location.pathname)
  const { isLoggedIn } = useAppContext()
  return (
    <header className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-2xl text-white font-bold tracking-tight">
          <Link to="/">MERNAplication.com</Link>
        </span>
        <span className="flex min-h-full gap-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="my-bookings">
                My bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-bold hover:bg-blue-600"
                to="my-hotels">
                My hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              {location.pathname !== '/sign-in' && (
                <Link
                  to="/sign-in"
                  className="flex h-full items-center text-blue-600 rounded-sm bg-white px-3 font-bold hover:bg-gray-100">
                  Sign In
                </Link>
              )}
            </>
          )}
        </span>
      </div>
    </header>
  )
}

export default Header
