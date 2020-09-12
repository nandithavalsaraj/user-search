import React from 'react'
import '../styles/App.css'
import DisplayCard from './DisplayCard'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.textInput = React.createRef()
        this.state = {
            apiResponse: {
                data: [],
                apiError: '',
                usernameValid: false,
            },
            validationError: '',
            showResults: false,
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
        this.setState({ showResults: true })
        event.preventDefault()
        this.setState({ apiResponse: this.defaultState.apiResponse }) // reset state
        if (!this.state.validationError) {
            if (this.textInput.value === '') {
                this.setState({ validationError: 'Invalid input' })
                this.setState({ showResults: false })
            } else {
                this.getUser(this.textInput.value)
            }
        }
    }

    handleChange = (event) => {
        var myRegEx = /[^a-z\d]/i
        if (!myRegEx.test(this.textInput.value)) {
            this.setState({ validationError: '' })
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
                        placeholder="Enter GitHub username"
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

                        {this.state.showResults &&
                            this.state.apiResponse.data.length === 0 &&
                            (this.state.apiResponse.apiError.length !== 0 ? (
                                <p>{this.state.apiResponse.apiError}</p>
                            ) : (
                                <p>No public repositories found!</p>
                            ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default App