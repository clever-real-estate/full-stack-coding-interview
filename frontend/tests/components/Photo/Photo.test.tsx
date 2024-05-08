import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Photo } from "../../../src/components/Photo";
import { photos } from "../../fixtures";

const onLike = jest.fn();

describe("<Photo />", () => {
  it("render the component should display all the properties", () => {
    render(<Photo photo={photos[0]} onLike={onLike} />);
    expect(screen.queryByText("Felix")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "A small island surrounded by trees in the middle of a lake"
      )
    ).toBeInTheDocument();
    expect(screen.queryByText("#333831")).toBeInTheDocument();
  });

  it("clicking on like button should fire the onLike function", () => {
    render(<Photo photo={photos[0]} onLike={onLike} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onLike).toHaveBeenCalledWith(1);
  });
});
