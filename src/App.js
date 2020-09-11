import React from 'react'
import './App.css'
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
            pristine: true,
        }
        this.defaultState = this.state
    }

    getUser(username) {
        return fetch(`https://api.github.com/users/${username}/repos`)
            .then((response) => {
                if (response.ok) {
                    response.json().then((json) => {
                        this.setState({
                            apiResponse: {
                                ...this.defaultState.apiResponse,
                                data: json,
                                usernameValid: true,
                            },
                        })
                    })
                } else if (response.status === 404) {
                    this.setState({
                        apiResponse: {
                            ...this.defaultState.apiResponse,
                            apiError: "Username doesn't exist",
                            usernameValid: false,
                        },
                    })
                } else {
                    throw response.statusText
                }
            })
            .catch((err) => {
                this.setState({
                    apiResponse: {
                        ...this.defaultState.apiResponse,
                        apiError: 'Error fetching data from github. ' + err,
                    },
                })
            })
    }

    handleSubmit = (event) => {
        this.setState({ pristine: false })
        event.preventDefault()
        this.setState({ apiResponse: this.defaultState.apiResponse }) // reset state
        if (!this.state.validationError) {
            this.getUser(this.textInput.value)
        }
    }

    handleChange = (event) => {
        var myRegEx = /[^a-z\d]/i
        if (!myRegEx.test(this.textInput.value)) {
            this.setState({ validationError: '' })
        } else {
            this.setState({ validationError: 'Invalid input' })
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
                    data-testid="Search-bar-test"
                >
                    <input
                        className="Search-bar"
                        ref={(textValue) => (this.textInput = textValue)}
                        placeholder="Enter GitHub username"
                        width="300px"
                        onChange={this.handleChange}
                    ></input>
                    {/*Validation error */}
                    {this.state.validationError && (
                        <p className="Validation-error">
                            {this.state.validationError}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="Submit"
                        disabled={this.state.validationError}
                    >
                        Submit
                    </button>
                </form>
                <div className="Search-result-container">
                    <div className="Cards">
                        {this.state.apiResponse.data.map((content, index) => {
                            return <DisplayCard content={content} key={index} />
                        })}

                        {/* {!this.state.pristine &&
                            this.state.apiResponse.data.length === 0 &&
                            this.state.apiResponse.usernameValid === true && (
                                <p>
                                    No public repositories found under{' '}
                                    {this.textInput.value} profile !
                                </p>
                            )} */}

                        {!this.state.pristine &&
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
