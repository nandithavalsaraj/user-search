import React from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import { render, fireEvent } from '@testing-library/react'
import DisplayCard from '../components/DisplayCard'
import { isTSAnyKeyword } from '@babel/types'
import { act } from 'react-dom/test-utils'

let container2 = null
beforeEach(() => {
    //Set up a DOM as a render target
    container2 = document.createElement('div')
    document.body.appendChild(container2)
})

afterEach(() => {
    //clean on exit
    unmountComponentAtNode(container2)
    container2.remove()
})

test('DisplayCard renders without crashing', () => {
    act(() => {
        render(
            <DisplayCard
                content={{
                    name: 'test1',
                    description: 'test description',
                    updated_at: '2020-09-03T22:27:10Z',
                }}
            />,
            container2
        )
    })
    expect(document.querySelector('a.Card-title').textContent).toBe('test1')
    expect(document.querySelector('p.Card-description').textContent).toBe(
        'test description'
    )
    expect(document.querySelector('p.Card-update-date').textContent).toBe(
        'Last Updated on 9/4/2020'
    )
})

test('Taking a snapshot', () => {
    const { asFragment } = render(
        <DisplayCard
            content={[
                { name: 'test2' },
                { description: 'test2 description' },
                { updated_at: '2022-09-03T22:27:10Z' },
            ]}
        />
    )
    expect(asFragment(<DisplayCard />)).toMatchSnapshot()
})
