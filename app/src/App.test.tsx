import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RoundedButton from "./components/RoundedButton";
import HeartIcon from "./assets/icons/heart.svg";
import "@testing-library/jest-dom";
import Loader from "./components/Loader";
import React from "react";
import Notification from "./components/Notification";
import Recommendation from "./interfaces/recommendation";
import MovieCard from "./components/MovieCard";

// ROUNDED BUTTON TESTS
describe("Rounded Button", () => {
  test("renders rounded button with icon", () => {
    render(
      <RoundedButton
        size="80"
        handleClick={() => {}}
        icon={HeartIcon}
        rippleColor="green"
      ></RoundedButton>
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls handleClick when button is clicked and is not disabled", () => {
    const handleClick = jest.fn();

    render(
      <RoundedButton
        size="80"
        handleClick={handleClick}
        icon={HeartIcon}
        rippleColor="green"
        isDisabled={false}
        isLoading={false}
      />
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call handleClick when button is disabled", () => {
    const handleClick = jest.fn();

    render(
      <RoundedButton
        size="80"
        handleClick={handleClick}
        icon={HeartIcon}
        rippleColor="green"
        isDisabled={true}
        isLoading={false}
      />
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test("displays loading indicator when isLoading is true", () => {
    render(
      <RoundedButton
        size="80"
        handleClick={() => {}}
        icon={HeartIcon}
        rippleColor="green"
        isDisabled={false}
        isLoading={true}
      />
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("displays icon when isLoading is false", () => {
    render(
      <RoundedButton
        size="80"
        handleClick={() => {}}
        icon={HeartIcon}
        rippleColor="green"
        isDisabled={false}
        isLoading={false}
      />
    );

    const iconElement = screen.getByRole("img");
    expect(iconElement).toBeInTheDocument();
  });
});

// LOADER TESTS
describe("Loader", () => {
  test("renders CircularProgress when isLoading is true", () => {
    render(<Loader isLoading={true} />);

    const loader = screen.getByRole("progressbar");
    expect(loader).toBeInTheDocument();
  });

  test("does not render CircularProgress when isLoading is false", () => {
    render(<Loader isLoading={false} />);

    const loader = screen.queryByRole("progressbar");
    expect(loader).not.toBeInTheDocument();
  });

  test("renders modal when isLoading is true", async () => {
    render(<Loader isLoading={true} />);

    const modal = await screen.getByRole("presentation", { hidden: true });
    expect(modal).toBeInTheDocument();
  });

  test("renders modal when isLoading is true", async () => {
    render(<Loader isLoading={false} />);

    const modal = screen.queryByRole("presentation");
    expect(modal).not.toBeInTheDocument();
  });
});

// NOTIFICATION
interface NotificationRef {
  createNotification: (message: string, color: "success" | "error") => void;
}

describe("Notification", () => {
  let createNotification: (message: string, color: "success" | "error") => void;

  beforeEach(() => {
    const ref = React.createRef<NotificationRef>();
    render(<Notification ref={ref} currentBreakpoint="lg" />);

    createNotification = ref.current!.createNotification; // Non-null assertion
  });

  test("renders notification with message and color", async () => {
    createNotification("Test message", "success");

    const notification = await screen.findByText("Test message");
    expect(notification).toBeInTheDocument();
  });

  test("closes notification after autoHideDuration", async () => {
    createNotification("Test message", "success");

    const notification = await screen.findByText("Test message");
    expect(notification).toBeInTheDocument();

    await waitFor(
      () => {
        expect(notification).not.toBeInTheDocument();
      },
      { timeout: 2500 }
    );
  });

  test("does not close on clickaway", async () => {
    createNotification("Test message", "success");

    const notification = await screen.findByText("Test message");
    expect(notification).toBeInTheDocument();

    fireEvent.click(notification);

    expect(notification).toBeInTheDocument();
  });
});

// MOVIE CARD
describe("Movie Card", () => {
  const movie: Recommendation = {
    id: "first123",
    title: "Test Movie",
    rating: 8.5,
    imageURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCwrDD7kI7DSBgyn52VpvqzekeS0FVtP0vZw&s",
    summary: "Test summary",
  };

  test("renders correctly", () => {
    render(<MovieCard movie={movie} onSwipe={() => {}} />);

    const titles = screen.getAllByText(movie.title);
    expect(titles.length).toBeGreaterThan(0);

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute("src", movie.imageURL);
  });
});
