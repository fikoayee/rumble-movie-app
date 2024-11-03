import { Button, CircularProgress } from "@mui/material";
interface Props {
  handleClick: () => void;
  size: string;
  icon: string;
  rippleColor: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}
const RoundedButton = ({
  handleClick,
  size,
  icon,
  rippleColor,
  isDisabled,
  isLoading,
}: Props) => {
  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: "100%",
        height: `${size}px`,
        width: `${size}px`,
        backgroundColor: "#f2f2f2",
        borderWidth: "0px",
        color: `${rippleColor}`,
      }}
      className="shadow-xl rounded-full bg-white"
      disabled={isDisabled || isLoading}
      onClick={handleClick}
    >
      {isLoading ? (
        <CircularProgress
          thickness={5}
          sx={{ color: rippleColor }}
          size={parseInt(size) / 2}
        />
      ) : (
        <img src={icon} />
      )}
    </Button>
  );
};
export default RoundedButton;
