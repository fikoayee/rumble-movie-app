import { Box, Grid2, Rating } from "@mui/material";
import React from "react";
import Recommendation from "../interfaces/recommendation";
import { motion, useMotionValue, useTransform } from "framer-motion";
import MoviePlaceholderImg from "../assets/images/movie-placeholder.png";
interface Props {
  children?: React.ReactNode;
  movie?: Recommendation;
  onSwipe: (isAccepted: boolean) => void;
}

const MovieCard = ({ children, movie, onSwipe }: Props) => {
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-300, 0, 300], [0, 1, 0]);

  const handleDragEnd = () => {
    let isAccepted = true;
    const xAxis = x.get();
    if (Math.abs(xAxis) > 100) {
      if (xAxis > 0) {
        // not quite sure if accept should be from left to right
        isAccepted = false;
      }
      onSwipe(isAccepted);
    }
  };
  function onImageError(e: React.SyntheticEvent<HTMLImageElement>) {
    e.currentTarget.src = MoviePlaceholderImg;
  }

  return (
    <>
      <Grid2
        component={motion.div}
        drag="x"
        size={{ xs: 12, md: 4 }}
        className="h-3/4 overflow-hidden relative shadow-2xl hover:cursor-grab active:cursor-grabbing"
        dragConstraints={{ left: 2, right: 2 }}
        style={{ x, opacity }}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onDragEnd={handleDragEnd}
      >
        <img
          src={movie?.imageURL || MoviePlaceholderImg}
          alt={movie?.title || "Movie Image"}
          onError={(e) => onImageError(e)}
          className="w-full h-full object-fill rounded-t-2xl md:rounded-t-none md:rounded-l-2xl md:rounded-tl-2xl"
        />
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <div className="absolute text-white top-4 bg-black w-full opacity-80 items-center px-2 py-2">
            <p className="text-lg sm:text-2xl font-[500]">{movie?.title}</p>

            <p className="text-sm sm:text-lg">Rating: ({movie?.rating}/10) </p>
          </div>
        </Box>
      </Grid2>
      <Grid2
        component={motion.div}
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, opacity }}
        size={{ xs: 12, md: 5, lg: 4 }}
        className="h-1/4 md:h-3/4 flex flex-col bg-white rounded-b-2xl md:rounded-b-none md:rounded-r-2xl md:rounded-br-2xl shadow-xl"
      >
        <div className="mx-1 flex-1 flex flex-col space-y-3 px-2 pt-0 md:pt-2 overflow-y-scroll pb-2 mb-2">
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <p className="text-4xl lg:text-5xl font-semibold text-neutral-900">
              {movie?.title}
            </p>
            <div className="flex items-center space-x-2 pointer-events-none mt-2">
              <Rating
                name="movie-rating"
                value={movie?.rating}
                max={10}
                precision={0.5}
                readOnly
              />
              <p className="text-neutral-400 tracking-wider text-sm">
                ({movie?.rating}/10)
              </p>
            </div>
          </Box>
          <p className="text-left md:text-justify text-sm sm:text-base  md:text-lg lg:text-xl md:px-4 overflow-y-scroll ">
            {movie?.summary}
          </p>
        </div>
        {children}
      </Grid2>
    </>
  );
};
export default MovieCard;
