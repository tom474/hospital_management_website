import { Box, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/utils/NavigationBar";
import Footer from "../components/utils/Footer";

const Root = () => {
    return (
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            }}
        >
            <CssBaseline />
            <NavigationBar  />

            <Container component="main" sx={{ flex: 1, mt: 8, mb: 2 }}>
                <Outlet />
            </Container>
  
            <Footer />
      </Box>
    );
}

export default Root;
