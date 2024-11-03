import { useMediaQuery, useTheme } from "@mui/material";

const useBreakpoint = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSmall = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const ixExtraSmall = useMediaQuery(theme.breakpoints.down("sm"));
  if (isLarge) {
    return "lg";
  } else if (isMedium) {
    return "md";
  } else if (isSmall) {
    return "sm";
  } else if (ixExtraSmall) {
    return "xs";
  }
};

export default useBreakpoint;
