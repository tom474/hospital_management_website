import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={(theme) => ({
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: theme.palette.color.blue[400],
            })}
        >
            <Container maxWidth="sm" sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Typography variant="body2" color="text.primary" sx={{
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