import { CircularProgress, Modal } from "@mui/material";
import React from "react";

interface Props {
    isLoading: boolean;
}

const Loader = ({ isLoading }: Props) => {
  return (
    <Modal open={isLoading} className="flex items-center justify-center">
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#FF7854" />
              <stop offset="100%" stop-color="#FD267D" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          thickness={5}
          size={80}
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </React.Fragment>
    </Modal>
  );
};
export default Loader;
