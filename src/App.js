import React from 'react'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    getUser(username) {
        return fetch(`https://api.github.com/users/${username}/repos`)
            .then((response) => {
                response.json().then((json) => {
                    this.setState({ data: json })
                })
            })
            .catch((err) => console.error(err))
    }

    handleSubmit = () => {
        this.getUser('nahzor')
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Search the Repo!</h1>
                </header>
                <div className="Search-bar-container">
                    <input
                        className="Search-bar"
                        placeholder="Enter user information"
                        width="300px"
                    ></input>
                    <button
                        className="Submit"
                        onClick={() => {
                            this.handleSubmit()
                        }}
                    >
                        Submit
                    </button>
                </div>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default App
