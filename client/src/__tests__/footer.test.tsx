import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/common/footer/footer.component";

describe("Test the Footer component", () => {
  it("renders correctly", () => {
    render(<Footer />);

    expect(screen).toMatchSnapshot();
  });

  it('To check it has expected class', async ()=>{
    render(<Footer/>)
    const expectedClass = await screen.findByRole('navigation');
    expect(expectedClass).toHaveClass('footer-bottom-left');
  })
});
