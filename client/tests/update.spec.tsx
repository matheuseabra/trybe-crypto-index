import { render, screen } from "@testing-library/react";
import Update from "../pages/update";

describe('Update', () => {
  it('should render a update currency page', async () => {
    const { container } = render(<Update />);
    expect(container).toBeTruthy();
    expect(screen.getByText('Voltar')).toBeInTheDocument();
    expect(screen.getByText('Novo valor')).toBeInTheDocument();
    expect(screen.getByText('ATUALIZAR')).toBeInTheDocument();
  });
});