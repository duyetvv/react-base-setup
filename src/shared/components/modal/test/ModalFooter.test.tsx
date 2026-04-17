import { describe, expect, it } from "vitest";
import { ModalFooter } from "../views/ModalFooter";

import { render, screen } from "@testing-library/react";

describe("ModalFooter Component", () => {
  it("matches snapshot with default props", () => {
    const { asFragment } = render(<ModalFooter>{""}</ModalFooter>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("has children text", () => {
    render(<ModalFooter>Test Footer</ModalFooter>);
    expect(screen.getByText("Test Footer")).toBeInTheDocument();
  });

  it("has test-footer class", () => {
    render(
      <ModalFooter className="test-footer">
        <div>Test Footer</div>
      </ModalFooter>,
    );
    const element = screen.getByText("Test Footer").closest(".test-footer");
    expect(element).toBeInTheDocument();
  });
});
