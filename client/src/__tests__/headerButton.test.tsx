import { render, screen } from "@testing-library/react";
import HeaderButton from "../components/common/header/headerButton.component";
import { BrowserRouter } from "react-router-dom";

describe("Test the Header Button component",  () => {
  it("renders correctly", () => {

  render(
  <BrowserRouter>
  <HeaderButton label="Login" />
  </BrowserRouter>);
    expect(screen).toMatchSnapshot();
  });

  it('testing the class of element', () => {
    render(
      <BrowserRouter>
      <HeaderButton label="Login" />
      </BrowserRouter>);
      const classElement = screen.getByText('Login');
      expect(classElement).toBeInTheDocument();
      expect(classElement).toHaveClass('btn-header');
  })
});