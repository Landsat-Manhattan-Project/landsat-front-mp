import { Mail } from "@mui/icons-material";
import { Box, Checkbox, Container, FormControlLabel } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import "./index.css";
import SendIcon from "@mui/icons-material/Send";
import { LandsatButton } from "../../../ui/button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { type UseLoginProps } from "../model/use_login";
import { Input } from "../../../ui/input";

interface Props {
  useLogin: UseLoginProps;
}

const Login = ({ useLogin }: Props) => {
  const {
    formData,
    formValidate,
    setFormData,
    handleSubmit,
    loginWithoutSession,
  } = useLogin;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "100%",
      }}
    >
      <h1 className="title">Sign In</h1>
      <Box
        noValidate
        autoComplete="off"
        component={"form"}
        sx={{
          display: "flex",
          gap: 2,
          mx: 2,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={formValidate && formData.email === ""}
          isRequired
          label={"Email"}
          type={"email"}
          icon={<Mail sx={{ color: "white", mr: 1, my: 0.5 }} />}
          errorLabel={"Email is required"}
        />
        <Input
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={formValidate && formData.password === ""}
          isRequired
          label={"Password"}
          type={"password"}
          icon={<PasswordIcon sx={{ color: "white", mr: 1, my: 0.5 }} />}
          errorLabel={"Password is required"}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
          }}
        >
          <FormControlLabel
            className="link"
            control={<Checkbox defaultChecked />}
            label="Remember me"
          />
        </Box>
        <LandsatButton
          text="Sign in"
          onClick={handleSubmit}
          icon={<SendIcon />}
          isStartIcon={false}
        />
      </Box>
      <hr />
      <Container
        maxWidth={"sm"}
        sx={{ display: "grid", alignContent: "center" }}
      >
        <LandsatButton
          onClick={loginWithoutSession}
          text="Login without session"
          isStartIcon
          btnStyleVariant={"btn2"}
          icon={<AccountCircleIcon />}
        />
      </Container>
    </Box>
  );
};

export { Login };
