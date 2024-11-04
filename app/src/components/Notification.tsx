import { useImperativeHandle, forwardRef, useState } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

interface Props {
  currentBreakpoint: string;
}

const Notification = forwardRef(({ currentBreakpoint }: Props, ref) => {
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarColor, setSnackbarColor] = useState<AlertColor>("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const mobileBreakpoints = ["xs", "sm"];

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const createNotification = (message: string, color: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarColor(color);
    setSnackbarOpen(true);
  };

  useImperativeHandle(ref, () => ({
    createNotification,
  }));

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{
        horizontal: "center",
        vertical: mobileBreakpoints.includes(currentBreakpoint)
          ? "top"
          : "bottom",
      }}
    >
      <Alert severity={snackbarColor} sx={{ width: "100%", minWidth: "300px" }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
});

export default Notification;
