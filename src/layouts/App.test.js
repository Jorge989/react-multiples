import { render } from "@testing-library/react";
import App from "./App";

test("should render App component", () => {
  const { getByRole } = render(<App />);
  const appComponent = getByRole("main");
  expect(appComponent).toBeInTheDocument();
});
