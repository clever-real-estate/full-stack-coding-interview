import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Login } from "../../../src/components/Login";

const onSubmit = jest.fn();
const onChange = jest.fn();

const params = {
  onSubmit,
  onChange,
  data: { username: "", password: "" },
  isLoading: false,
  errors: {},
};

describe("<Login />", () => {
  it("render the component should display two fields and a button", () => {
    const { container } = render(<Login {...params} />);
    expect(container.querySelectorAll("input")).toHaveLength(2);
    expect(screen.queryAllByRole("button")).toHaveLength(1);
  });

  it("should fire onChange when typing in some of the inputs", () => {
    const { container } = render(<Login {...params} />);
    const input = container.querySelector(`input[name="username"]`);
    if (input) {
      fireEvent.change(input, { target: { value: "Felipe" } });
    }
    expect(onChange).toHaveBeenCalled();
  });

  it("should fire onSubmit when clicking on submit button", () => {
    render(<Login {...params} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onSubmit).toHaveBeenCalled();
  });
});
