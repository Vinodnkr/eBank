import './index.css'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

const Home = () => {
  const history = useHistory()

  const handleHistory = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <div className="bgh">
      <div className="bgh1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />

        <button onClick={handleHistory} className="btn" type="button">
          Logout
        </button>
      </div>
      <div className="cont">
        <h1>Your Flexibility, Our Excellence</h1>
        <img
          className="img"
          alt="digital card"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        />
      </div>
    </div>
  )
}

export default Home
