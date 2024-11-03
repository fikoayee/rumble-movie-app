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
import { useRecommendation } from "./hooks/useRecommendation";
import Recommendation from "./interfaces/recommendation";
import Loader from "./components/Loader";
const App = () => {
  // recommendations
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const { getRecommendations, acceptRecommendation, rejectRecommendation } =
    useRecommendation();

  const getRecommendationList = async () => {
    try {
      setIsLoading(true);
      const response = await getRecommendations();
      if (!response) {
        return showNotification(
          "Oops! Could not get movie recommendations ",
          "error"
        );
      }
      setRecommendations(response);
    } catch (error) {
      return showNotification(
        "Oops! Could not get movie recommendations ",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRecommendation = async (id: string) => {
    try {
      setIsAccepting(true);
      const response = await acceptRecommendation(id);
      if (!response) {
        return showNotification("Oops! Unable to accept the movie.", "error");
      }
      showNotification("Success! Movie accepted.", "success");
    } catch (error) {
      return showNotification("Oops! Unable to accept the movie.", "error");
    } finally {
      setIsAccepting(false);
    }
  };
  const handleRejectRecommendation = async (id: string) => {
    try {
      setIsRejecting(true);
      const response = await rejectRecommendation(id);
      if (!response) {
        return showNotification("Oops! Unable to reject the movie.", "error");
      }
      showNotification("Success! Movie rejected.", "success");
    } catch (error) {
      return showNotification("Oops! Unable to reject the movie.", "error");
    } finally {
      setIsRejecting(false);
    }
  };

  useEffect(() => {
    getRecommendationList();
  }, []);

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

  const simulateDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate waiting time for api call
  };

  return (
    <div className="bg-neutral-200 flex flex-col h-screen">
      <Notification ref={snackbarRef} currentBreakpoint={currentBreakpoint} />
      <Loader isLoading={isLoading} />
      <Navbar />
      <Grid2
        container
        className="flex-1 flex flex-col bg-neutral-200 overflow-hidden justify-center items-center p-2"
      >
        <MovieCard movie={recommendations[0]}>
          <div className="flex justify-between px-14 md:justify-center md:space-x-10 mb-auto items-center pb-2 sm:pb-3 md:py-4">
            <RoundedButton
              handleClick={() => handleAcceptRecommendation(MOVIE.id)}
              size={buttonSize}
              icon={HeartIcon}
              rippleColor="green"
              isDisabled={isRejecting}
              isLoading={isAccepting}
            />
            <RoundedButton
              handleClick={() => handleRejectRecommendation(MOVIE.id)}
              size={buttonSize}
              icon={RejectIcon}
              rippleColor="red"
              isDisabled={isAccepting}
              isLoading={isRejecting}
            />
          </div>
        </MovieCard>
      </Grid2>
    </div>
  );
};
export default App;
