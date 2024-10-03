import {
  Box,
  FormControl,
  FormHelperText,
  Input as IP,
  InputLabel,
} from "@mui/material";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  icon?: React.ReactNode;
  label?: string;
  error?: boolean;
  isRequired?: boolean;
  errorLabel?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: unknown;
}

const Input = ({
  onChange,
  isRequired = false,
  icon,
  label,
  error,
  errorLabel,
  type,
  value,
}: Props) => {
  return (
    <FormControl error={error} variant="standard" sx={{ width: "90%" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "flex-end",
          gap: 1,
        }}
      >
        {icon}
        <Box sx={{ position: "relative", width: "100%" }}>
          <InputLabel
            error={error}
            color={error ? "error" : undefined}
            required={isRequired}
          >
            {label}
          </InputLabel>
          <IP
            value={value}
            type={type}
            error={error}
            fullWidth
            required={isRequired}
            onChange={onChange}
            id="component-error"
            aria-describedby="component-error-text"
          />
        </Box>
      </Box>
      {error && (
        <FormHelperText error={error} sx={{ pl: 5 }} id="component-error-text">
          {errorLabel}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export { Input };
