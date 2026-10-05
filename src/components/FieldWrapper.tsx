import ErrorIcon from "@mui/icons-material/Error";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

type FieldWrapperProps = {
  label?: ReactNode;
  htmlFor?: string;
  labelId?: string;
  required?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  children: ReactNode;
};

export function FieldWrapper({
  label,
  htmlFor,
  labelId,
  required,
  disabled,
  errorMessage,
  children,
}: FieldWrapperProps) {
  return (
    <Box>
      {label && (
        <FormLabel
          htmlFor={htmlFor}
          id={labelId}
          disabled={disabled}
          sx={{
            display: "block",
            textAlign: "start",
            mb: 0.75,
            fontSize: 14,
            color: "grey.800",
          }}
        >
          {label}
          {required && " (required)"}
        </FormLabel>
      )}

      {children}

      {errorMessage && (
        <Typography
          role="alert"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 0.75,
            fontSize: 14,
            color: "error.main",
          }}
        >
          <ErrorIcon sx={{ fontSize: 16 }} />
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}
