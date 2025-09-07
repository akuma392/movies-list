import React, { createContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState("light");

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === "light"
                        ? {
                            background: {
                                default: "#f5f5f5",
                                paper: "#ffffff",
                            },
                            text: {
                                primary: "#000000",
                            },
                        }
                        : {
                            background: {
                                default: "#121212",
                                paper: "#1e1e1e",
                            },
                            text: {
                                primary: "#ffffff",
                            },
                        }),
                    primary: { main: "#1976d2" },
                    secondary: { main: "#ff4081" },
                },
            }),
        [mode]
    );

    const toggleTheme = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
