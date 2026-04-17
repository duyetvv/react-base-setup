import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import Tabs from "./index";

const sources = [
  { key: "tab1", label: "Tab 1", content: "Content 1" },
  { key: "tab2", label: "Tab 2", content: "Content 2" },
];

describe("Tabs", () => {
  it("renders tab labels", () => {
    render(<Tabs sources={sources} activeKey="tab1" onChange={() => {}} />);
    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });

  it("renders active tab content", () => {
    render(<Tabs sources={sources} activeKey="tab1" onChange={() => {}} />);
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });

  it("calls onChange when tab clicked", () => {
    const handleChange = vi.fn();
    render(<Tabs sources={sources} activeKey="tab1" onChange={handleChange} />);
    const tab2 = screen.getByText("Tab 2");
    fireEvent.click(tab2);
    expect(handleChange).toHaveBeenCalledWith("tab2");
  });

  it("renders different content when activeKey changes", () => {
    const { rerender } = render(
      <Tabs sources={sources} activeKey="tab1" onChange={() => {}} />,
    );
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    rerender(<Tabs sources={sources} activeKey="tab2" onChange={() => {}} />);
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });
});
