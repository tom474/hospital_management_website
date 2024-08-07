import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { NavButton } from './NavButton';

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
};

const NavigationBar = () => {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor: 'light',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'light'
            }}
          >

              <img
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                }
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <NavButton location="/" title="Home" />
                <NavButton location="/patients" title="Patient" />
                <NavButton location="/staffs" title="Staff" />
                <NavButton location="/appointments" title="Appointment" />
              </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default NavigationBar;