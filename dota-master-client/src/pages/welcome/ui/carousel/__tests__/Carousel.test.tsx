import { render, screen } from "@testing-library/react";
import Carousel from "..";
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';

describe("Carousel", () => {
  it("renders all elements", () => {
    render(<Carousel />);
    expect(screen.getByText(/laning/i)).toBeInTheDocument();
    expect(screen.getByText(/heroes/i)).toBeInTheDocument();
    expect(screen.getByText(/farming/i)).toBeInTheDocument();
    expect(screen.getByText(/builds/i)).toBeInTheDocument();
  });
});
