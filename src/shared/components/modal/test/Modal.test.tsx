import { vi, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Modal } from "../Modal";

describe("Modal Component", () => {
  const onClose = vi.fn();

  it("should not render when isOpen is falsy", () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <div>Content</div>
      </Modal>,
    );

    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  // it("should render when isOpen is truthy", () => {
  //   render(
  //     <Modal isOpen onClose={onClose}>
  //       <div>Content</div>
  //     </Modal>,
  //   );

  //   expect(screen.getByText("Content")).toBeInTheDocument();
  // });

  // it("should apply custom className", () => {
  //   const { container } = render(
  //     <Modal isOpen onClose={onClose} className="custom-class">
  //       <div>Content</div>
  //     </Modal>,
  //   );

  //   expect(container.querySelector(".custom-class")).toBeTruthy();
  // });
});
