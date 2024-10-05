import { Mail } from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import PasswordIcon from "@mui/icons-material/Password";
import "./index.css";
import SendIcon from "@mui/icons-material/Send";
import { LandsatButton } from "../../../ui/button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { type UseLoginProps } from "../model/use_login";
import { Input } from "../../../ui/input";
import { type IFormData } from "../../general/model/use_general_auth";

interface Props {
  useLogin: UseLoginProps;
  loginAsGuest: () => Promise<void>;
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const Login = ({ useLogin, loginAsGuest, formData, setFormData }: Props) => {
  const { formValidate, handleSubmit } = useLogin;

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
          onClick={loginAsGuest}
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
