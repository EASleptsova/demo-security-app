import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { SecurityDetail } from "./SecurityDetail";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("SecurityDetail", () => {
  it("should render 'No data found' if no param provided", () => {
    (useParams as jest.Mock).mockImplementation(() => ({
      symbol: null,
    }));
    render(<SecurityDetail />);
    expect(screen.getByText("No data found")).toBeInTheDocument();
  });

  it("should render SecurityDetail", () => {
    (useParams as jest.Mock).mockImplementation(() => ({
      symbol: "AAPL",
    }));
    render(<SecurityDetail />);
    expect(screen.getByText("Security Detail")).toBeInTheDocument();
    expect(screen.getByText("Security Detail chart")).toBeInTheDocument();
    expect(screen.getByText("Sector: Technology")).toBeInTheDocument();
    expect(screen.getByText("Country: United States")).toBeInTheDocument();
  });
});
