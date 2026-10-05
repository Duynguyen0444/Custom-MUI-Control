import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Autocomplete, {
  type AutocompleteRenderOptionState,
} from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import type { AutocompleteValue as MuiAutocompleteValue } from "@mui/material/useAutocomplete";
import type { HTMLAttributes, Key, Ref, UIEvent } from "react";
import type { Option } from "../types";

const SCROLL_THRESHOLD = 20;

const uncheckedIcon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const isOptionEqualToValue = (option: Option, value: Option) =>
  option.value === value.value;
const getOptionLabel = (option: Option) => option.label;
const getOptionKey = (option: Option) => option.value;
const passthroughFilter = (options: Option[]) => options;

const renderCheckboxOption = (
  props: HTMLAttributes<HTMLLIElement> & { key: Key },
  option: Option,
  { selected }: AutocompleteRenderOptionState,
) => {
  const { key, ...optionProps } = props;
  return (
    <li key={key} {...optionProps}>
      <Checkbox
        icon={uncheckedIcon}
        checkedIcon={checkedIcon}
        checked={selected}
        size="small"
        sx={{ mr: 1, p: 0.5 }}
      />
      {option.label}
    </li>
  );
};

/** `Option[]` when `M` is `true`, `Option | null` when `M` is `false` (same mapping MUI uses). */
export type AutocompleteValue<M extends boolean> = MuiAutocompleteValue<
  Option,
  M,
  false,
  false
>;

export type AppAutocompleteProps<M extends boolean> = {
  /** `true`: checkboxes + chips, stays open on select. `false`: single value, closes on select. */
  multiple: M;
  id?: string;
  value: AutocompleteValue<M>;
  options: Option[];
  onChange: (value: AutocompleteValue<M>) => void;
  onBlur?: () => void;
  inputRef?: Ref<HTMLInputElement>;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  loading?: boolean;
  /** `false` when options are already filtered by the server */
  filterLocally?: boolean;
  /**
   * Controlled input text. Only applied when `multiple` is `true`; in single mode
   * MUI owns the input text so the selected label is shown after a selection.
   */
  inputValue?: string;
  /**
   * Reports the search term. In single mode this is the typed text, or `''`
   * after a selection / clear / blur so the full list is shown on next open.
   */
  onInputChange?: (value: string) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
};

export function AppAutocomplete<M extends boolean>({
  multiple,
  id,
  value,
  options,
  onChange,
  onBlur,
  inputRef,
  placeholder,
  disabled,
  error,
  loading = false,
  filterLocally = true,
  inputValue,
  onInputChange,
  hasMore = false,
  onLoadMore,
}: AppAutocompleteProps<M>) {
  const hasValue = Array.isArray(value) ? value.length > 0 : value !== null;

  const handleListboxScroll = (event: UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (
      hasMore &&
      scrollTop + clientHeight >= scrollHeight - SCROLL_THRESHOLD
    ) {
      onLoadMore?.();
    }
  };

  return (
    <Autocomplete<Option, M, false, false>
      multiple={multiple}
      disableCloseOnSelect={multiple}
      limitTags={multiple ? 2 : undefined}
      fullWidth
      size="small"
      id={id}
      value={value}
      options={options}
      disabled={disabled}
      loading={loading}
      onChange={(_event, newValue) => onChange(newValue)}
      onBlur={onBlur}
      inputValue={multiple ? inputValue : undefined}
      onInputChange={(_event, newInputValue, reason) => {
        if (multiple) {
          // 'reset' fires after each selection; keep the search text so users can tick several items
          if (reason === "reset") return;
          onInputChange?.(newInputValue);
          return;
        }
        // Single: only real typing is a search; selecting/clearing/blurring resets the query
        onInputChange?.(reason === "input" ? newInputValue : "");
      }}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      getOptionKey={getOptionKey}
      filterOptions={filterLocally ? undefined : passthroughFilter}
      renderOption={multiple ? renderCheckboxOption : undefined}
      slotProps={{
        listbox: { onScroll: handleListboxScroll },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          variant="outlined"
          error={error}
          placeholder={hasValue ? undefined : placeholder}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={18} />}
                  {params.slotProps.input.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
}
