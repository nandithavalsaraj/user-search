import React from 'react'
import '../styles/DisplayCard.css'

/*Component for the Display cards for the search results*/
class DisplayCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.input,
            content: this.props.content,
        }
    }

    render() {
        var date = new Date(this.state.content.updated_at).toLocaleDateString()
        var url =
            'https://github.com/' +
            this.state.username +
            '/' +
            this.state.content.name
        return (
            <div className="Display-card">
                <a
                    className="Card-title"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {this.state.content.name}
                </a>
                <p className="Card-description">
                    {this.state.content.description}
                </p>
                <p className="Card-update-date">
                    {/* {this.state.content.updated_at} */}
                    Last Updated on {date}
                </p>
            </div>
        )
    }
}

export default DisplayCard
