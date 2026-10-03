import ClearIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField, { type TextFieldProps } from "@mui/material/TextField";
import type { Ref } from "react";

export type AppInputProps = Omit<
  TextFieldProps,
  "variant" | "ref" | "label"
> & {
  ref?: Ref<HTMLInputElement>;
  onClear?: () => void;
};

export const AppInput = ({
  ref,
  onClear,
  slotProps,
  size = "small",
  fullWidth = true,
  ...rest
}: AppInputProps) => {
  const showClear = !!onClear && !!rest.value && !rest.disabled;

  return (
    <TextField
      {...rest}
      inputRef={ref}
      size={size}
      fullWidth={fullWidth}
      variant="outlined"
      slotProps={{
        ...slotProps,
        input: {
          ...(slotProps?.input as object),
          endAdornment: showClear ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label="Xóa"
                onClick={onClear}
                edge="end"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
};
