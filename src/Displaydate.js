import React from 'react'

class Displaydate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dateISOFormat: this.props.date,
        }
    }
    render() {
        var date = new Date(this.state.dateISOFormat)
        return (
            <div>
                Last Updated on
                {' ' +
                    date.getDay() +
                    '/' +
                    date.getMonth() +
                    '/' +
                    date.getFullYear()}
            </div>
        )
    }
}

export default Displaydate
