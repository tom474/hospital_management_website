import { createTheme } from "@mui/material";

/**
 * Theme configuration to use through out the application
 */
export const theme = createTheme({
    palette: {
        color: {
            white: {
                100: "#ffffff",
            },
            blue: {
                100: "#00A9FF",
                200: "#89CFF3",
                300: "#A0E9FF",
                400: "#CDF5FD"
            }
        }
    }
});