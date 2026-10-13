import { render, screen, fireEvent } from "@testing-library/react";
import FeedbackForm from "./FeedbackForm.jsx";

const t = (id) => screen.getByTestId(id);
const q = (id) => screen.queryByTestId(id);

test("starts clean: counter 0/200, no errors, rating options empty + 1..5", () => {
  render(<FeedbackForm />);
  expect(t("comment-count")).toHaveTextContent("0/200");
  expect(q("name-error")).toBeNull();
  const opts = Array.from(t("rating-select").querySelectorAll("option")).map((o) => o.value);
  expect(opts).toEqual(["", "1", "2", "3", "4", "5"]);
});

test("empty submit shows all three errors and no success", () => {
  render(<FeedbackForm />);
  fireEvent.click(t("submit-btn"));
  expect(t("name-error")).toBeInTheDocument();
  expect(t("email-error")).toBeInTheDocument();
  expect(t("rating-error")).toBeInTheDocument();
  expect(q("success-msg")).toBeNull();
});

test("errors disappear as fields become valid", () => {
  render(<FeedbackForm />);
  fireEvent.click(t("submit-btn"));
  fireEvent.change(t("name-input"), { target: { value: "Asha" } });
  expect(q("name-error")).toBeNull();
  fireEvent.change(t("email-input"), { target: { value: "bad" } });
  expect(t("email-error")).toBeInTheDocument();
  fireEvent.change(t("email-input"), { target: { value: "a@b.com" } });
  expect(q("email-error")).toBeNull();
  fireEvent.change(t("rating-select"), { target: { value: "4" } });
  expect(q("rating-error")).toBeNull();
});

test("comment counter tracks length", () => {
  render(<FeedbackForm />);
  fireEvent.change(t("comment-input"), { target: { value: "hello" } });
  expect(t("comment-count")).toHaveTextContent("5/200");
});

test("valid submit shows the confirmation (comment optional)", () => {
  render(<FeedbackForm />);
  fireEvent.change(t("name-input"), { target: { value: "Asha" } });
  fireEvent.change(t("email-input"), { target: { value: "asha@example.com" } });
  fireEvent.change(t("rating-select"), { target: { value: "5" } });
  fireEvent.click(t("submit-btn"));
  expect(t("success-msg")).toHaveTextContent("Thank you, Asha! Feedback submitted.");
});
