import React from 'react'
import './App.css'
import Displaydate from './Displaydate'

class DisplayCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: this.props.content,
        }
    }
    render() {
        return (
            <div className="Display-card">
                <h1 className="Card-title">{this.state.content.name}</h1>
                <p className="Card-description">
                    {this.state.content.description}
                </p>
                <div className="Card-update-date">
                    {/* {this.state.content.updated_at} */}
                    <Displaydate date={this.state.content.updated_at} />
                </div>
            </div>
        )
    }
}

export default DisplayCard
