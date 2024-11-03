import { AlertColor, Grid2 } from "@mui/material";
import MovieCard from "./components/MovieCard";
import RoundedButton from "./components/RoundedButton";
import { MOVIE } from "./mock/data";
import useBreakpoint from "./hooks/useBreakpoint";
import { useEffect, useRef, useState } from "react";
import HeartIcon from "./assets/icons/heart.svg";
import RejectIcon from "./assets/icons/reject.svg";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
const App = () => {
  // recommendations 
  const handleSelection = () => {
    showNotification("test toast", "success");
  };

  // breakpoints
  const [prevBreakpoint, setPrevBreakpoint] = useState<string>("");
  const [buttonSize, setButtonSize] = useState<string>("");
  const currentBreakpoint = useBreakpoint() as string;
  useEffect(() => {
    if (currentBreakpoint !== prevBreakpoint) {
      resizeButtons();
      setPrevBreakpoint(currentBreakpoint);
    }
  }, [currentBreakpoint]);

  const resizeButtons = () => {
    switch (currentBreakpoint) {
      case "xs":
        return setButtonSize("60");
      case "sm":
        return setButtonSize("70");
      default:
        return setButtonSize("75");
    }
  };

  // notification
  const snackbarRef = useRef<{
    createNotification: (message: string, color: AlertColor) => void;
  }>(null);

  const showNotification = (message: string, color: AlertColor) => {
    if (snackbarRef.current) {
      snackbarRef.current.createNotification(message, color);
    }
  };

  return (
    <div className="bg-neutral-200 flex flex-col h-screen">
      <Notification ref={snackbarRef} currentBreakpoint={currentBreakpoint} />
      <Navbar />
      <Grid2
        container
        className="flex-1 flex flex-col bg-neutral-200 overflow-hidden justify-center items-center p-2"
      >
        <MovieCard movie={MOVIE}>
          <div className="flex justify-between px-14 md:justify-center md:space-x-10 mb-auto items-center pb-2 sm:pb-3 md:py-4">
            <RoundedButton
              handleClick={() => handleSelection()}
              size={buttonSize}
              icon={HeartIcon}
              rippleColor="green"
            />
            <RoundedButton
              handleClick={() => handleSelection()}
              size={buttonSize}
              icon={RejectIcon}
              rippleColor="red"
            />
          </div>
        </MovieCard>
      </Grid2>
    </div>
  );
};
export default App;
