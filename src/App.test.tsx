import { describe, expect, it} from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe ('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByRole('heading', {
      level: 1
    })
  ).toHaveTextContent('Vite + React')
  })
})