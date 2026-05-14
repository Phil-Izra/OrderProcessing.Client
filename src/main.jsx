import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './auth/AuthContext';
import App from './App';
import theme from './theme/theme';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<QueryClientProvider client={queryClient}>
<ThemeProvider theme={theme}>
<CssBaseline />
<BrowserRouter>
<AuthProvider>
<App />
</AuthProvider>
</BrowserRouter>
</ThemeProvider>
</QueryClientProvider>
</React.StrictMode>
);