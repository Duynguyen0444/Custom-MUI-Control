import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import { theme } from './theme.ts'

// Lowercase section placeholders so empty date fields read dd/mm/yyyy
const pickerLocaleText = {
  fieldDayPlaceholder: () => 'dd',
  fieldMonthPlaceholder: () => 'mm',
  fieldYearPlaceholder: (params: { digitAmount: number }) => 'y'.repeat(params.digitAmount),
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
})

async function enableMocking() {
  if (!import.meta.env.DEV) return
  const { worker } = await import('./mocks/browser')
  // msw v3 renamed `onUnhandledRequest` to `onUnhandledFrame`
  return worker.start({ onUnhandledFrame: 'bypass' })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs} localeText={pickerLocaleText}>
            <CssBaseline />
            <App />
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
})
