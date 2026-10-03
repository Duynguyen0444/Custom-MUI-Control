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
};

export function FormTextField<T extends FieldValues>({
  name,
  control,
  label,
  required,
  disabled,
  clearable,
  id,
  ...rest
}: FormTextFieldProps<T>) {
  const { field, fieldState } = useController({ name, control, disabled });
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <FieldWrapper
      label={label}
      htmlFor={inputId}
      required={required}
      disabled={field.disabled}
      errorMessage={fieldState.error?.message}
    >
      <AppInput
        {...rest}
        {...field}
        id={inputId}
        value={field.value ?? ""}
        error={!!fieldState.error}
        onClear={clearable ? () => field.onChange("") : undefined}
      />
    </FieldWrapper>
  );
}
