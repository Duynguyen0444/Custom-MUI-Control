import { autocompleteClasses } from '@mui/material/Autocomplete';
import { inputBaseClasses } from '@mui/material/InputBase';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme } from '@mui/material/styles';

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
