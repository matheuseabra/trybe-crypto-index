import { render, screen } from "@testing-library/react";
import Home from "../pages/home";

describe('Home', () => {
  it('should render the homepage', async () => {
    const { container } = render(<Home />);
    expect(container).toBeTruthy();
    expect(screen.queryByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('Atualizar valor monetário')).toBeInTheDocument();
  });
});