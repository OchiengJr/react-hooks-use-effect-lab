import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Question from "../components/Question";

jest.useFakeTimers();

const testQuestion = {
  id: 1,
  prompt: "lorem testum",
  answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
  correctIndex: 0,
};

const noop = () => {};

test("renders with 10 seconds remaining", () => {
  render(<Question question={testQuestion} onAnswered={noop} />);
  expect(screen.getByText("10 seconds remaining")).toBeInTheDocument();
});

test("decrements the timer by 1 every second", () => {
  render(<Question question={testQuestion} onAnswered={noop} />);
  act(() => {
    jest.advanceTimersByTime(3000);
  });
  expect(screen.getByText("7 seconds remaining")).toBeInTheDocument();
});

test("calls onAnswered after 10 seconds", () => {
  const onAnswered = jest.fn();
  render(<Question question={testQuestion} onAnswered={onAnswered} />);
  act(() => {
    jest.advanceTimersByTime(11000);
  });
  expect(onAnswered).toHaveBeenCalledWith(false);
});

test("clears the timeout after unmount", () => {
  const { unmount } = render(
    <Question question={testQuestion} onAnswered={noop} />
  );
  unmount();
  expect(clearTimeout).toHaveBeenCalled();
});
