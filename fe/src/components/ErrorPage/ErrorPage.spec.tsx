import { render, screen } from "@testing-library/react";
import { ErrorPage } from "./ErrorPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useRouteError: () => new Error("An unexpected error has occurred"),
}));

describe("ErrorPage", () => {
  it("should render ErrorPage", () => {
    render(<ErrorPage />);
    expect(
      screen.getByText("Sorry, an unexpected error has occurred.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("An unexpected error has occurred")
    ).toBeInTheDocument();
  });
});
