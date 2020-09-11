import React from 'react'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.textInput = React.createRef()
        this.state = {
            data: [],
            error: '',
            start: false,
            reposCount: -1,
        }
    }

    getUser(username) {
        return fetch(`https://api.github.com/users/${username}/repos`)
            .then((response) => {
                if (response.ok) {
                    response.json().then((json) => {
                        console.log(json)
                        this.setState({ data: json })
                        this.setState({ reposCount: json.length })
                    })
                } else if (response.status === 404) {
                    this.setState({ error: "Username doesn't exist" })
                } else {
                    this.setState({ error: response.statusText })
                }
            })
            .catch((err) => {
                this.setState({
                    error: 'Trouble fetching data from github. ' + err,
                })
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()
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

    handleError = (error) => {}

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
                            return (
                                <div className="Display-card" key={index}>
                                    <h1 className="Card-title">
                                        {content.name}
                                    </h1>
                                    <p className="Card-description">
                                        {content.description}
                                    </p>
                                    <div className="Card-update-date">
                                        {content.updated_at}
                                    </div>
                                </div>
                            )
                        })}

                        {this.state.start === true &&
                            this.state.reposCount === 0 && (
                                <p>
                                    No public Repos found under{' '}
                                    {this.textInput.value} profile !
                                </p>
                            )}

                        {this.state.start === true &&
                            (!this.state.data ||
                                this.state.reposCount === -1) && (
                                <p className="Invalid-output">
                                    {this.state.error}!!
                                </p>
                            )}
                    </div>
                </div>
            </div>
        )
    }
}

export default App
