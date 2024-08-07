import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm" sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant="body2" color="text.secondary" sx={{
                    fontStyle: 'italic'
                }}>
                    {'© '}
                    {new Date().getFullYear()}
                    {' Group 10'}
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;