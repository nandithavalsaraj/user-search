import React from 'react'
import ReactDOM from 'react-dom'
import { render } from '@testing-library/react'
import DisplayCard from './components/DisplayCard'
import { isTSAnyKeyword } from '@babel/types'

test('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <DisplayCard
            content={[
                { name: 'test' },
                { description: 'test description' },
                { updated_at: '2020-09-03T22:27:10Z' },
            ]}
        />,
        div
    )
})
