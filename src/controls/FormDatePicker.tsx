import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useId } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FieldWrapper } from "../components/FieldWrapper";
import {
  DATE_DISPLAY_FORMAT,
  fromDateValue,
  parseDateValue,
  toDateValue,
} from "../utils/date";

type FormDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  /** Earliest selectable date, 'YYYY-MM-DD' */
  minDate?: string;
  /** Latest selectable date, 'YYYY-MM-DD' */
  maxDate?: string;
};

/**
 * Date input that supports typing (DD/MM/YYYY) and a calendar popup.
 * The form value is a 'YYYY-MM-DD' string: '' when empty, INVALID_DATE_VALUE while the typed date is incomplete/impossible.
 */
export function FormDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  required,
  disabled,
  minDate,
  maxDate,
}: FormDatePickerProps<T>) {
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
  const inputId = useId();
  const labelId = `${inputId}-label`;

  return (
    <FieldWrapper
      label={label}
      htmlFor={inputId}
      labelId={label ? labelId : undefined}
      required={required}
      disabled={fieldDisabled}
      errorMessage={fieldState.error?.message}
    >
      <DatePicker
        // Focusing the (hidden) input focuses the field, so RHF can focus it on submit errors
        inputRef={ref}
        name={fieldName}
        value={fromDateValue(value)}
        onChange={(date) => onChange(toDateValue(date))}
        format={DATE_DISPLAY_FORMAT}
        disabled={fieldDisabled}
        minDate={minDate ? parseDateValue(minDate) : undefined}
        maxDate={maxDate ? parseDateValue(maxDate) : undefined}
        slotProps={{
          textField: {
            id: inputId,
            size: "small",
            fullWidth: true,
            error: !!fieldState.error,
            onBlur,
            // The visible label lives in FieldWrapper; point the field's group role at it
            slotProps: {
              input: { "aria-labelledby": label ? labelId : undefined },
            },
          },
        }}
      />
    </FieldWrapper>
  );
}
