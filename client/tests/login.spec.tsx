import { render, screen } from "@testing-library/react";
import Login from "../pages";

describe('Login', () => {
  it('should render a login page', async () => {
    const { container, getByText } = render(<Login />);
    expect(container).toBeTruthy();
    expect(screen.queryByText('Email')).toBeInTheDocument();
    expect(screen.queryByText('Senha')).toBeInTheDocument();
  });
});