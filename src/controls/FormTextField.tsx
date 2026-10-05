import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useId, type ReactNode } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FieldWrapper } from "../components/FieldWrapper";
import { AppInput, type AppInputProps } from "../components/TextField";

type FormTextFieldProps<T extends FieldValues> = Omit<
  AppInputProps,
  "name" | "value" | "onChange"
> & {
  name: Path<T>;
  control: Control<T>;
  label?: ReactNode;
  clearable?: boolean;
  /** Text rendered after the input, e.g. a unit such as "Hours" */
  suffix?: ReactNode;
};

export function FormTextField<T extends FieldValues>({
  name,
  control,
  label,
  required,
  disabled,
  clearable,
  suffix,
  id,
  ...rest
}: FormTextFieldProps<T>) {
  const { field, fieldState } = useController({ name, control, disabled });
  const autoId = useId();
  const inputId = id ?? autoId;

  const input = (
    <AppInput
      {...rest}
      {...field}
      id={inputId}
      value={field.value ?? ""}
      error={!!fieldState.error}
      onClear={clearable ? () => field.onChange("") : undefined}
    />
  );

  return (
    <FieldWrapper
      label={label}
      htmlFor={inputId}
      required={required}
      disabled={field.disabled}
      errorMessage={fieldState.error?.message}
    >
      {suffix ? (
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>{input}</Box>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", flexShrink: 0 }}
          >
            {suffix}
          </Typography>
        </Stack>
      ) : (
        input
      )}
    </FieldWrapper>
  );
}
