import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import { SecurityTable } from "./SecurityTable";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SecurityTable", () => {
  it("should render SecurityTable", () => {
    render(<SecurityTable />);
    expect(screen.getByText("Security List")).toBeInTheDocument();
    expect(screen.getByText("Symbol")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Sector")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Trend")).toBeInTheDocument();
  });

  it("should navigate to detail page after clicking on table row", () => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(<SecurityTable />);
    userEvent.click(screen.getByText("AAPL"));
    expect(mockNavigate).toHaveBeenCalledWith("/securities/AAPL");
  });
});
