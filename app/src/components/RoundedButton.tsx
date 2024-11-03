import { Button } from "@mui/material";
interface Props {
  handleClick: () => void;
  size: string;
  icon: string;
  rippleColor: string;
}
const RoundedButton = ({ handleClick, size, icon, rippleColor }: Props) => {
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
      onClick={handleClick}
    >
      <img src={icon} />
    </Button>
  );
};
export default RoundedButton;
