import React from 'react'
import '../styles/App.css'
import DisplayCard from './DisplayCard'

/*Main Component for the Project*/
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

    /*function to make fetch api calls and handles api errors*/
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

    /*Function calls on form submit. 
    The getUser() function is called if the search input is valid else sets validation error.*/
    handleSubmit = (event) => {
        this.setState({ showResults: true })
        event.preventDefault()
        this.setState({ apiResponse: this.defaultState.apiResponse }) // reset state
        if (!this.state.validationError) {
            if (this.textInput.value === '') {
                console.log('invalid')
                this.setState({ validationError: 'Invalid input' })
                this.setState({ showResults: false })
            } else {
                this.getUser(this.textInput.value)
            }
        }
    }
    /*Function called on input text box data change.
    Handles validation errors during typing*/
    handleChange = (event) => {
        var myRegEx = /[^a-z\d]/i
        if (!myRegEx.test(this.textInput.value)) {
            this.setState({ validationError: '' })
        } else {
            this.setState({ validationError: 'Invalid input' })
            this.setState({ showResults: false })
            // this.getUser(this.textInput.value)
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
                    data-testid="form-testid"
                >
                    <input
                        className="Search-bar"
                        ref={(textValue) => (this.textInput = textValue)}
                        placeholder="Enter GitHub username"
                        width="300px"
                        onChange={this.handleChange}
                        data-testid="input-testid"
                    ></input>
                    {this.state.validationError && (
                        <p className="Validation-error">
                            {this.state.validationError}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="Submit"
                        disabled={this.state.validationError}
                        data-testid="button-testid"
                    >
                        Submit
                    </button>
                </form>
                <div className="Search-result-container">
                    <div className="Cards">
                        {this.state.showResults === true &&
                            this.state.apiResponse.data.map(
                                (content, index) => {
                                    return (
                                        <DisplayCard
                                            input={this.textInput.value}
                                            content={content}
                                            key={index}
                                        />
                                    )
                                }
                            )}

                        {this.state.showResults &&
                            this.state.apiResponse.data.length === 0 &&
                            (this.state.apiResponse.apiError.length !== 0 ? (
                                <p>{this.state.apiResponse.apiError}</p>
                            ) : (
                                this.state.validationError === '' && (
                                    <p>
                                        No public repositories found for the
                                        user!
                                    </p>
                                )
                            ))}
                    </div>
                </div>
                <footer className="App-footer">
                    <p>Created using ReactJS</p>
                </footer>
            </div>
        )
    }
}

export default App
