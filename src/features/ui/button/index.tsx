import { Button, SxProps, Theme } from "@mui/material";

interface Props {
  icon?: React.ReactNode;
  isStartIcon?: boolean;
  text: string;
  variant?: "text" | "contained" | "outlined";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  btnStyleVariant?: "btn1" | "btn2";
  sx?: SxProps<Theme>;
  type?: "submit" | "reset" | "button";
}

const LandsatButton = ({
  icon,
  isStartIcon,
  text,
  variant,
  onClick,
  btnStyleVariant,
  sx,
  type = "button",
}: Props) => {
  const btnStyles = (): SxProps<Theme> => {
    switch (btnStyleVariant) {
      case "btn2":
        return {
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.125)",
          borderRadius: "6px",
          color: "white",
          fontWeight: "bold",
          my: 1,
          px: 2,
          backdropFilter: "blur(16px) saturate(180%)",
        };
      default:
        return {
          backgroundColor: "white",
          border: "1px solid rgba(17, 25, 40, 0.75)",
          borderRadius: "6px",
          color: "black",
          fontWeight: "bold",
          my: 1,
          px: 2,
        };
    }
  };

  const styles: SxProps<Theme> = btnStyles();

  const finalSx = Object.assign({}, sx, styles);

  return (
    <Button
      type={type}
      startIcon={isStartIcon !== undefined && isStartIcon ? icon : null}
      variant={variant}
      sx={finalSx}
      onClick={onClick}
      endIcon={isStartIcon !== undefined && !isStartIcon ? icon : null}
    >
      {text}
    </Button>
  );
};

export { LandsatButton };
