import { vi, describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { ModalView } from "../views/ModalView";

describe("ModalView Component", () => {
  const childText = "Test ModalView";

  it("should match snapshot when opened", () => {
    const onClose = vi.fn();

    const { asFragment } = render(
      <ModalView isOpen={true} onClose={onClose}>
        {null}
      </ModalView>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should match snapshot when closed", () => {
    const onClose = vi.fn();

    const { container } = render(
      <ModalView isOpen={false} onClose={onClose}>
        {null}
      </ModalView>,
    );

    expect(container).toMatchSnapshot();
  });

  it("should renders children when open", () => {
    const onClose = vi.fn();

    render(
      <ModalView isOpen={true} onClose={onClose}>
        <div>{childText}</div>
      </ModalView>,
    );

    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it("should renders custom classname when open", () => {
    const onClose = vi.fn();

    const extraClassName = "custom-classname";

    render(
      <ModalView className={extraClassName} isOpen={true} onClose={onClose}>
        <div>{childText}</div>
      </ModalView>,
    );

    const eleByClassName = screen
      .getByText(childText)
      .closest(`.${extraClassName}`);
    expect(eleByClassName).toBeInTheDocument();
  });

  it("should trigger onClose on click Backdrop once closeOnBackdropClick truthy", async () => {
    const onClose = vi.fn();

    render(
      <ModalView closeOnBackdropClick={true} isOpen={true} onClose={onClose}>
        <div>{childText}</div>
      </ModalView>,
    );

    fireEvent.click(screen.getByText(childText).closest(`.modal__overlay`)!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
