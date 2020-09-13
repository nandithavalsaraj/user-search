import React from 'react'
import '../styles/DisplayCard.css'

/*Component for the Display cards for the search results*/
class DisplayCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: this.props.content,
        }
    }
    render() {
        var date = new Date(this.state.content.updated_at).toLocaleDateString()
        return (
            <div className="Display-card">
                <h1 className="Card-title">{this.state.content.name}</h1>
                <p className="Card-description">
                    {this.state.content.description}
                </p>
                <div className="Card-update-date">
                    {/* {this.state.content.updated_at} */}
                    Last Updated on {date}
                </div>
            </div>
        )
    }
}

export default DisplayCard
