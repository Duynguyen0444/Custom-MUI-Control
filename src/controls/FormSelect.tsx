import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useId } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FieldWrapper } from "../components/FieldWrapper";
import type { Option } from "../types";

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options: Option[];
};

export function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  required,
  disabled,
  options,
}: FormSelectProps<T>) {
  const { field, fieldState } = useController({ name, control, disabled });
  const inputId = useId();

  return (
    <FieldWrapper
      label={label}
      htmlFor={inputId}
      required={required}
      disabled={field.disabled}
      errorMessage={fieldState.error?.message}
    >
      <TextField
        {...field}
        id={inputId}
        select
        fullWidth
        size="small"
        value={field.value ?? ""}
        error={!!fieldState.error}
        slotProps={{
          select: {
            displayEmpty: true,
            renderValue: (v) =>
              v ? (
                options.find((o) => o.value === v)?.label
              ) : (
                <span style={{ color: "#9e9e9e" }}>{placeholder}</span>
              ),
          },
        }}
      >
        {options.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </TextField>
    </FieldWrapper>
  );
}
