import React from 'react'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
        }
    }

    getUser(username) {
        return fetch(`https://api.github.com/users/${username}/repos`)
            .then(function (response) {
                response.json().then(function (dataSet) {
                    dataSet.forEach(function (data) {
                        console.log(data.name)
                        console.log(data.description)
                        console.log(data.updated_at)
                    })
                })
            })
            .catch((err) => console.error(err))
    }

    handleSubmit = () => {
        console.log('hi')
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
                        <div className="Display-card">
                            <h1 className="Card-title">
                                global-nuclear-console
                            </h1>
                            <p className="Card-description">
                                global nuclear console for the destruction of
                                world using python
                            </p>
                            <div className="Card-update-date">
                                Last update on date1
                            </div>
                        </div>
                        <div className="Display-card">
                            <h1 className="Card-title">
                                spontaneous-spider-analysis
                            </h1>
                            <p className="Card-description">
                                spontaneous analysis of spider venom using
                                machine learning
                            </p>
                            <div className="Card-update-date">
                                Last update on date2
                            </div>
                        </div>
                        <div className="Display-card">
                            <h1 className="Card-title">
                                newbie-paintball-master
                            </h1>
                            <p className="Card-description">
                                npm is a package manager
                            </p>
                            <div className="Card-update-date">
                                Last update on date3
                            </div>
                        </div>
                        <div className="Display-card">
                            <h1 className="Card-title">
                                nonviolent-pirate-monster
                            </h1>
                            <p className="Card-description">
                                npm is a package manager
                            </p>
                            <div className="Card-update-date">
                                Last update on date4
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App
