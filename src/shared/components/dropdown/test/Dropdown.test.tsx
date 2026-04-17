// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { vi, describe, it, expect, beforeEach } from "vitest";

// import Dropdown from "../index";

// import type { Option } from "../types";

// const options: Option[] = [
//   { value: "1", label: "Option 1" },
//   { value: "2", label: "Option 2" },
// ];

// describe("Dropdown component", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it("shows placeholder when value is empty and toggles options list", async () => {
//     render(<Dropdown options={options} onChange={vi.fn()} />);

//     const header = screen.getByText("Select an option");
//     expect(header).toBeInTheDocument();

//     await userEvent.click(header);
//     expect(screen.getByText("Option 1")).toBeInTheDocument();
//     expect(screen.getByText("Option 2")).toBeInTheDocument();
//   });

//   it("renders current selected value and custom renderOption path", async () => {
//     const customRenderer = vi.fn((option: Option) => `*${option.label}*`);

//     render(
//       <Dropdown
//         options={options}
//         value={options[1]}
//         onChange={vi.fn()}
//         renderOption={customRenderer}
//       />,
//     );

//     expect(screen.getByText("Option 2")).toBeInTheDocument();

//     await userEvent.click(screen.getByText("Option 2"));
//     expect(screen.getByText("*Option 1*")).toBeInTheDocument();
//     expect(customRenderer).toHaveBeenCalledWith(options[0]);
//   });

//   it("invokes onChange and onOpen/onClose callbacks correctly", async () => {
//     const onChange = vi.fn();
//     const onOpen = vi.fn();
//     const onClose = vi.fn();

//     render(
//       <Dropdown
//         options={options}
//         onChange={onChange}
//         onOpen={onOpen}
//         onClose={onClose}
//       />,
//     );

//     const header = screen.getByText("Select an option");

//     await userEvent.click(header);
//     expect(onOpen).toHaveBeenCalledTimes(1);

//     await userEvent.click(screen.getByText("Option 1"));
//     expect(onChange).toHaveBeenCalledWith(options[0]);
//     expect(onClose).toHaveBeenCalledTimes(1);

//     // await userEvent.click(screen.getByText("Option 1")); // open again
//     // expect(screen.getByText("Option 1")).toBeInTheDocument();

//     // await userEvent.click(document.body);
//     // await waitFor(() => {
//     //   expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
//     // });
//   });

//   // it("supports keyboard interactions and accessibility roles", async () => {
//   //   render(
//   //     <Dropdown
//   //       options={options}
//   //       value={options[1]}
//   //       onChange={vi.fn()}
//   //       onOpen={vi.fn()}
//   //       onClose={vi.fn()}
//   //     />,
//   //   );

//   //   const header = screen.getByRole("button", { name: /select an option/i });
//   //   await userEvent.click(header);

//   //   const option = screen.getByText("Option 2");
//   //   expect(option).toBeInTheDocument();
//   //   await userEvent.click(option);

//   //   expect(screen.getByText("Option 2")).toBeInTheDocument();
//   // });
// });

// // describe("useDropdown hook behavior", () => {
// //   beforeEach(() => {
// //     vi.clearAllMocks();
// //   });

// //   it("opens and closes with callbacks and selects value", async () => {
// //     const onChange = vi.fn();
// //     const onOpen = vi.fn();
// //     const onClose = vi.fn();

// //     render(
// //       <Dropdown
// //         options={options}
// //         onChange={onChange}
// //         onOpen={onOpen}
// //         onClose={onClose}
// //       />,
// //     );

// //     const toggle = screen.getByRole("button", { name: /option 1/i });

// //     await userEvent.click(toggle);
// //     expect(onOpen).toHaveBeenCalledTimes(1);
// //     expect(screen.getByTestId("list")).toBeInTheDocument();

// //     await userEvent.click(screen.getByRole("button", { name: /option 2/i }));
// //     expect(onChange).toHaveBeenCalledWith(options[1]);

// //     await waitFor(() => {
// //       expect(screen.queryByTestId("list")).not.toBeInTheDocument();
// //     });

// //     await userEvent.click(toggle);
// //     await userEvent.click(document.body);
// //     expect(onClose).toHaveBeenCalled();
// //   });

// //   it("force-closes dropdown via handleToggle(false)", async () => {
// //     const onChange = vi.fn();
// //     const onOpen = vi.fn();
// //     const onClose = vi.fn();

// //     render(
// //       <Dropdown
// //         options={options}
// //         onChange={onChange}
// //         onOpen={onOpen}
// //         onClose={onClose}
// //       />,
// //     );

// //     const toggle = screen.getByRole("button", { name: /toggle/i });
// //     await userEvent.click(toggle);
// //     expect(onOpen).toHaveBeenCalledTimes(1);

// //     await userEvent.click(document.body);
// //     await waitFor(() => {
// //       expect(screen.queryByTestId("list")).not.toBeInTheDocument();
// //     });

// //     expect(onClose).toHaveBeenCalled();
// //   });
// // });
