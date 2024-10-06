import { Mail } from "@mui/icons-material";
import { Box, Container, MenuItem, TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import "./index.css";
import SendIcon from "@mui/icons-material/Send";
import { LandsatButton } from "../../../ui/button";
import { type UseRegisterProps } from "../model/use_register";
import { Input } from "../../../ui/input";
import { type IFormData } from "../../general/model/use_general_auth";

interface Props {
  useRegister: UseRegisterProps;
  loginAsGuest: () => Promise<void>;
  formData: IFormData;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
}

const Register = ({
  useRegister,
  loginAsGuest,
  formData,
  setFormData,
}: Props) => {
  const { formValidate, handleSubmit } = useRegister;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "100%",
      }}
    >
      <h1 className="title">Sign Up</h1>
      <Box
        noValidate
        autoComplete="off"
        component={"form"}
        onSubmit={handleSubmit}
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
        <TextField
          sx={{ width: "90%", color: "black", mt: 1 }}
          id="select"
          label="What is your purpose?"
          value={formData.appPurpose}
          select
          error={formValidate && formData.password === ""}
          required
          onChange={(e) =>
            setFormData({ ...formData, appPurpose: e.target.value })
          }
        >
          <MenuItem sx={{ color: "white" }} value="citizen">
            Citizen
          </MenuItem>
          <MenuItem value="farmer">Farmer</MenuItem>
          <MenuItem value="college_student">College student</MenuItem>
          <MenuItem value="engineer">Engineer</MenuItem>
          <MenuItem value="biologist">Biologist</MenuItem>
          <MenuItem value="geologist">Geologist</MenuItem>
        </TextField>
        <LandsatButton
          text={"Sign up"}
          onClick={handleSubmit}
          icon={<SendIcon sx={{ color: "black" }} />}
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

export { Register };
