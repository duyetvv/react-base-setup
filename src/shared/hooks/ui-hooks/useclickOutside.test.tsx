import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useRef } from "react";

import useClickOutside from "./useClickOutside";

type TestProps = {
  onOutside: (event: MouseEvent | TouchEvent) => void;
};

function TestComponent({ onOutside }: TestProps) {
  const ref = useRef<HTMLDivElement>(null!);
  useClickOutside(ref, onOutside);

  return (
    <div>
      <div data-testid="inside" ref={ref}>
        inside
      </div>
      <div data-testid="outside">outside</div>
    </div>
  );
}

describe("useClickOutside", () => {
  it("calls handler when clicking outside", () => {
    const onOutside = vi.fn();
    render(<TestComponent onOutside={onOutside} />);

    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it("does not call handler when clicking inside", () => {
    const onOutside = vi.fn();
    render(<TestComponent onOutside={onOutside} />);

    fireEvent.mouseDown(screen.getByTestId("inside"));
    expect(onOutside).not.toHaveBeenCalled();
  });

  it("calls handler on touchstart outside", () => {
    const onOutside = vi.fn();
    render(<TestComponent onOutside={onOutside} />);

    fireEvent.touchStart(screen.getByTestId("outside"));
    expect(onOutside).toHaveBeenCalledTimes(1);
  });

  it("removes listeners on unmount", () => {
    const onOutside = vi.fn();
    const { unmount } = render(<TestComponent onOutside={onOutside} />);

    unmount();
    fireEvent.mouseDown(document.body);
    expect(onOutside).not.toHaveBeenCalled();
  });
});
