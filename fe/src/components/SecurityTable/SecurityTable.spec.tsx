import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";
import { SecurityTable } from "./SecurityTable";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("SecurityTable", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              ticker: "AAPL",
              securityName: "Apple Inc.",
              sector: "Technology",
              country: "United States",
              trend: 10,
            },
          ]),
      })
    ) as jest.Mock;
  });

  it("should render SecurityTable", () => {
    render(<SecurityTable />);
    waitFor(() => {
      expect(screen.getByText("Security List")).toBeInTheDocument();
      expect(screen.getByText("Symbol")).toBeInTheDocument();
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Sector")).toBeInTheDocument();
      expect(screen.getByText("Country")).toBeInTheDocument();
      expect(screen.getByText("Trend")).toBeInTheDocument();
    });
  });

  it("should navigate to detail page after clicking on table row", () => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(<SecurityTable />);
    waitFor(() => {
      userEvent.click(screen.getByText("AAPL"));
      expect(mockNavigate).toHaveBeenCalledWith("/securities/AAPL");
    });
  });

  it("should render 'Loading' message", async () => {
    render(<SecurityTable />);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("http://localhost:7000/securities");
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
