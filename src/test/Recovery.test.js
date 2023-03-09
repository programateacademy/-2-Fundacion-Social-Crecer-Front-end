import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Recovery from '../components/Recovery';

describe("test input and form", () => {
    test("must have a form", () => {
        render(<Recovery />);
        expect(screen.getByRole("form")).toBeInTheDocument()
    })
    test("must have a input that placeholder contains the word 'contraseña'", () => {
        render(<Recovery />);
        expect(screen.getByPlaceholderText("Nueva Contraseña")).toBeInTheDocument()
    })
})

describe("test button", () => {
    test("must have a button ", () => {
        render(<Recovery />);
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
    test("button of type submit", () => {
        render(<Recovery />);
        expect(screen.getByRole('button')).toHaveAttribute("type","submit")
    })
    test("button have text 'cambiar'", () => {
        render(<Recovery />);
        expect(screen.getByRole('button')).toHaveTextContent(/cambiar/i)
    })    
})