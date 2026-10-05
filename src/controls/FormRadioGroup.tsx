import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useId } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FieldWrapper } from "../components/FieldWrapper";
import type { Option } from "../types";

type FormRadioGroupProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  options: Option[];
  /** Lay options out horizontally (default) or vertically */
  row?: boolean;
};

export function FormRadioGroup<T extends FieldValues>({
  name,
  control,
  label,
  required,
  disabled,
  options,
  row = true,
}: FormRadioGroupProps<T>) {
  const {
    field: {
      ref,
      value,
      onChange,
      onBlur,
      name: fieldName,
      disabled: fieldDisabled,
    },
    fieldState,
  } = useController({ name, control, disabled });
  const labelId = useId();
  const hasError = !!fieldState.error;

  return (
    <FieldWrapper
      label={label}
      labelId={labelId}
      required={required}
      disabled={fieldDisabled}
      errorMessage={fieldState.error?.message}
    >
      <RadioGroup
        name={fieldName}
        value={value ?? ""}
        onChange={(_event, newValue) => onChange(newValue)}
        onBlur={onBlur}
        row={row}
        aria-labelledby={labelId}
        aria-invalid={hasError}
        sx={{ columnGap: 3 }}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            disabled={fieldDisabled}
            control={
              <Radio
                size="small"
                color={hasError ? "error" : "primary"}
                // RHF focuses the first radio when this field has an error on submit
                slotProps={{ input: { ref: index === 0 ? ref : undefined } }}
              />
            }
          />
        ))}
      </RadioGroup>
    </FieldWrapper>
  );
}
