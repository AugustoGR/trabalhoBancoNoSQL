import { ThemeProvider } from '@mui/material/styles';
import { UserProvider } from "@/contexts/useUserContext";
import theme from "@/theme";

export const Providers = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <UserProvider>
                {children}
            </UserProvider>
        </ThemeProvider>
    );
}