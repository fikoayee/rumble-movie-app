import { AlertColor, Grid2 } from "@mui/material";
import MovieCard from "./components/MovieCard";
import RoundedButton from "./components/RoundedButton";
import useBreakpoint from "./hooks/useBreakpoint";
import { useEffect, useRef, useState } from "react";
import HeartIcon from "./assets/icons/heart.svg";
import RejectIcon from "./assets/icons/reject.svg";
import UndoIcon from "./assets/icons/undo.svg";
import RefreshIcon from "./assets/icons/refresh.svg";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import { useRecommendation } from "./hooks/useRecommendation";
import Recommendation from "./interfaces/recommendation";
import Loader from "./components/Loader";
import EmptyState from "./components/EmptyState";
import MovieCardSkeleton from "./components/MovieCardSkeleton";
const App = () => {
  // recommendations
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const {
    getRecommendations,
    acceptRecommendation,
    rejectRecommendation,
    resetRecommendationsStatus,
  } = useRecommendation();

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

  const handleAcceptRecommendation = async (recommendation: Recommendation) => {
    try {
      setIsAccepting(true);
      const response = await acceptRecommendation(recommendation.id);
      if (!response) {
        return showNotification("Oops! Unable to accept the movie.", "error");
      }
      recommendation.isAccepted = true;
      showNotification("Success! Movie accepted.", "success");
    } catch (error) {
      return showNotification("Oops! Unable to accept the movie.", "error");
    } finally {
      setIsAccepting(false);
    }
  };
  const handleRejectRecommendation = async (recommendation: Recommendation) => {
    try {
      setIsRejecting(true);
      const response = await rejectRecommendation(recommendation.id);
      if (!response) {
        return showNotification("Oops! Unable to reject the movie.", "error");
      }
      recommendation.isAccepted = false;
      showNotification("Success! Movie rejected.", "success");
    } catch (error) {
      return showNotification("Oops! Unable to reject the movie.", "error");
    } finally {
      setIsRejecting(false);
    }
  };

  const resetRecommendations = async () => {
    try {
      setIsLoading(true);
      const response = await resetRecommendationsStatus();
      if (!response) {
        setIsLoading(false);
        return showNotification(
          "Oops! Couldn't reset your movie picks.",
          "error"
        );
      }
      showNotification(
        "Success! Your movie selection has been reset.",
        "success"
      );
    } catch (error) {
      setIsLoading(false);
      return showNotification(
        "Oops! Couldn't reset your movie picks.",
        "error"
      );
    }
  };

  const handleReset = () => {
    resetRecommendations();
    getRecommendationList();
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

  const currentRecommendation = recommendations.find(
    (recommendation) => recommendation.isAccepted === null
  );

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
      <Loader isLoading={isLoading} />
      <Navbar />
      <Grid2
        container
        className="flex-1 flex flex-col bg-neutral-200 overflow-hidden justify-center items-center p-2"
      >
        {!isLoading ? (
          currentRecommendation ? (
            <MovieCard
              key={currentRecommendation.id}
              movie={currentRecommendation}
            >
              <div className="flex justify-between px-14 md:justify-center md:space-x-10 mb-auto items-center pb-2 sm:pb-3 md:py-4">
                <RoundedButton
                  handleClick={() =>
                    handleAcceptRecommendation(currentRecommendation)
                  }
                  size={buttonSize}
                  icon={HeartIcon}
                  rippleColor="green"
                  isDisabled={isRejecting}
                  isLoading={isAccepting}
                />
                <RoundedButton
                  handleClick={() =>
                    handleRejectRecommendation(currentRecommendation)
                  }
                  size={buttonSize}
                  icon={RejectIcon}
                  rippleColor="red"
                  isDisabled={isAccepting}
                  isLoading={isRejecting}
                />
              </div>
            </MovieCard>
          ) : (
            <EmptyState
              header="No Recommendations Available"
              text="Currently, there are no recommendations to display. Please try refreshing the page or reset your previous choices, including accepted and rejected movies, to see if any new recommendations are available."
            >
              <div className="pb-20 flex justify-between md:justify-center space-x-24 px-4 md:mt-4 sm:pb-28 sm:px-8">
                <RoundedButton
                  handleClick={() => handleReset()}
                  size="80"
                  icon={UndoIcon}
                  rippleColor="#2db6cb"
                />
                <RoundedButton
                  handleClick={() => getRecommendationList()}
                  size="80"
                  icon={RefreshIcon}
                  rippleColor="yellow"
                />
              </div>
            </EmptyState>
          )
        ) : (
          <MovieCardSkeleton />
        )}
      </Grid2>
    </div>
  );
};
export default App;
