import { autocompleteClasses } from '@mui/material/Autocomplete';
import { inputBaseClasses } from '@mui/material/InputBase';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme } from '@mui/material/styles';
// Adds the MuiPickers* component keys to the theme types
import type {} from '@mui/x-date-pickers/themeAugmentation';

export const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body1,
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
          backgroundColor: theme.palette.common.white,
          [`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: theme.palette.error.main,
          },
        }),
        input: ({ theme }) => ({
          padding: theme.spacing(1.5, 1.75),
        }),
      },
    },
    // MUI X pickers render their own input (PickersOutlinedInput + section list), not OutlinedInput; mirror the overrides above
    MuiPickersOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...theme.typography.body1,
          borderRadius: Number(theme.shape.borderRadius) * 1.5,
          backgroundColor: theme.palette.common.white,
        }),
        // Horizontal padding (1.75) comes from the root, so only the vertical part of the input padding goes here
        sectionsContainer: ({ theme }) => ({
          padding: theme.spacing(1.5, 0),
        }),
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          // Anchoring the menu disables MUI's "selected item over the input" positioning, so it opens below the field
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          transformOrigin: { vertical: 'top', horizontal: 'left' },
          slotProps: {
            paper: { sx: (theme) => ({ maxHeight: theme.spacing(40), mt: 0.5 }) },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: ({ theme }) => ({
          // Same selector MUI uses for size="small": root padding 0.75 + input 0.75 = 1.5 (top/bottom), 0.75 + 1 = 1.75 (left)
          [`& .${outlinedInputClasses.root}.${inputBaseClasses.sizeSmall} .${autocompleteClasses.input}`]: {
            padding: theme.spacing(0.75, 0.5, 0.75, 1),
          },
        }),
      },
    },
  },
});
