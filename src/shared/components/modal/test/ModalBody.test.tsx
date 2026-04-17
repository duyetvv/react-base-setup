import { describe, expect, it } from "vitest";
import { ModalBody } from "../views/ModalBody";

import { render, screen } from "@testing-library/react";

describe("ModalBody Component", () => {
  it("matches snapshot with default props", () => {
    const { asFragment } = render(<ModalBody>{""}</ModalBody>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("has children text", () => {
    render(<ModalBody>Test Body</ModalBody>);
    expect(screen.getByText("Test Body")).toBeInTheDocument();
  });

  it("has test-body class", () => {
    render(
      <ModalBody className="test-body">
        <div>Test Body</div>
      </ModalBody>,
    );
    const element = screen.getByText("Test Body").closest(".test-body");
    expect(element).toBeInTheDocument();
  });
});
