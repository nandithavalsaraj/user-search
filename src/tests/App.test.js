import React from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import App from '../components/App'
import DisplayCard from '../components/DisplayCard'
import { isTSAnyKeyword } from '@babel/types'
import { act } from 'react-dom/test-utils'

let container = null
beforeEach(() => {
    //Set up a DOM as a render target
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    //clean on exit
    unmountComponentAtNode(container)
    container.remove()
})

test('App with proper title', () => {
    act(() => {
        render(<App />, container)
    })
    expect(document.querySelector('h1').textContent).toBe('Search the Repo!')
})

test('Render user repo list', async () => {
    const fakeApiResponse = [
        {
            id: 15020377,
            name: 'arduino-snippets',
            description: 'Arduino code snippets to try out different sensors.',
            updated_at: '2020-09-04T17:54:45Z',
        },
    ]
    jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(fakeApiResponse),
        })
    )
    await act(async () => {
        render(<App />, container)
        new Promise((resolve, reject) => {
            fireEvent.change(document.querySelector('input.Search-bar'), {
                target: { value: 'nahzor' },
            })
            resolve()
        }).then(() => {
            fireEvent.click(document.querySelector('button.Submit'))
        })
    })

    expect(document.querySelector('div.Display-card')).not.toBeNull()
    expect(document.querySelector('a.Card-title').textContent).toBe(
        'arduino-snippets'
    )
    expect(document.querySelector('p.Card-description').textContent).toBe(
        'Arduino code snippets to try out different sensors.'
    )
    expect(document.querySelector('p.Card-update-date').textContent).toContain(
        '9/4/2020'
    )
    global.fetch.mockRestore()
})

test('Submit rendered correctly', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('button-testid')).toHaveTextContent('Submit')
})

test('Form rendered correctly', () => {
    const { getByTestId } = render(<App />)
    expect(getByTestId('form-testid')).toHaveClass('Search-bar-container')
})

test('Taking a snapshot', () => {
    const { asFragment } = render(<App />)
    expect(asFragment(<App />)).toMatchSnapshot()
})
