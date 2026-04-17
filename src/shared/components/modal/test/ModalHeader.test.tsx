import { describe, expect, it } from "vitest";
import { ModalHeader } from "../views/ModalHeader";

import { render, screen } from "@testing-library/react";

describe("ModalHeader Component", () => {
  it("matches snapshot with default props", () => {
    const { asFragment } = render(<ModalHeader>{""}</ModalHeader>);
    expect(asFragment()).toMatchSnapshot();
  });

  it("has Children text", () => {
    render(<ModalHeader>Test header</ModalHeader>);
    expect(screen.getByText("Test header")).toBeInTheDocument();
  });

  it("has test-header class", () => {
    render(
      <ModalHeader className="test-header">
        <div>Test header</div>
      </ModalHeader>,
    );
    const element = screen.getByText("Test header").closest(".test-header");
    expect(element).toBeInTheDocument();
  });
});
