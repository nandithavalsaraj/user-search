import React from 'react'
import './App.css'
import DisplayCard from './DisplayCard'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.textInput = React.createRef()
        this.state = {
            data: [],
            error: '',
            start: false,
            usernameValid: false,
        }
        this.defaultState = this.state
    }

    getUser(username) {
        return fetch(`https://api.github.com/users/${username}/repos`)
            .then((response) => {
                if (response.ok) {
                    response.json().then((json) => {
                        this.setState({ data: json })
                        this.setState({ usernameValid: true })
                    })
                } else if (response.status === 404) {
                    this.setState({ error: "Username doesn't exist" })
                    this.setState({ usernameValid: false })
                } else {
                    this.setState({ error: response.statusText })
                }
            })
            .catch((err) => {
                this.setState({
                    error: 'Error fetching data from github. ' + err,
                })
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState(this.defaultState) // reset form fields
        this.setState({ start: true })
        if (
            this.textInput.value.length === 0 ||
            this.textInput.value.indexOf(',') > -1
        ) {
            this.setState({ error: 'Invalid input' })
        } else {
            this.getUser(this.textInput.value)
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Search the Repo!</h1>
                </header>
                <form
                    className="Search-bar-container"
                    onSubmit={this.handleSubmit}
                >
                    <input
                        className="Search-bar"
                        ref={(textValue) => (this.textInput = textValue)}
                        placeholder="Enter user information"
                        width="300px"
                    ></input>
                    <button type="submit" className="Submit">
                        Submit
                    </button>
                </form>
                <div className="Search-result-container">
                    <div className="Cards">
                        {this.state.data.map((content, index) => {
                            return <DisplayCard content={content} key={index} />
                        })}

                        {this.state.start === true &&
                            this.state.username === true && (
                                <p>
                                    No public Repos found under{' '}
                                    {this.textInput.value} profile !
                                </p>
                            )}

                        {this.state.start === true &&
                            (!this.state.data ||
                                this.state.usernameValid === false) && (
                                <p className="Invalid-output">
                                    {this.state.error}
                                </p>
                            )}
                    </div>
                </div>
            </div>
        )
    }
}

export default App
