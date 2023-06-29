import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie' // Import the js-cookie library
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    pinError: false,
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value})
    if (name === 'pin' && value.length === 0) {
      this.setState({pinError: true})
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const {history} = this.props

    // Construct the request body
    const requestBody = {
      user_id: userId,
      pin: pin,
    }

    // Make the API call
    fetch('https://apis.ccbp.in/ebank/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response
        if (data.jwt_token) {
          // Login success, perform necessary actions
          console.log('Login success!')
          console.log('JWT Token:', data.jwt_token)
          // eslint-disable-next-line no-undef
          Cookies.set('jwt_token', jwtToken, {expires: 3})

          history.replace('/')
        }
      })
  }

  render() {
    const {userId, pin, pinError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg">
        <div className="bg1">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-img"
            />
          </div>
          <div className="login-container">
            <h1>Welcome Back</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="input-container">
                <label className="label" htmlFor="userId">
                  User ID
                </label>
                <input
                  placeholder="Enter User ID"
                  className="input-field"
                  id="userId"
                  name="userId"
                  type="text"
                  value={userId}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-container">
                <label className="label" htmlFor="pin">
                  PIN
                </label>
                <input
                  placeholder="Enter PIN"
                  className="input-field"
                  id="pin"
                  name="pin"
                  type="password"
                  value={pin}
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {pinError && <p style={{color: 'red'}}>Invalid user ID</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
