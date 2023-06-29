import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie' // Import the js-cookie library
import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    pinError: false,
    errorMsg: '',
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
    const userDetails = {user_id: userId, pin}
    console.log(userDetails)
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.setState({pinError: true, errorMsg: data.error_msg})
    }
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {userId, pin, pinError, errorMsg} = this.state
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
              {pinError && <p style={{color: 'red'}}>{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
