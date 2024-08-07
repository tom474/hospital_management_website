import { Box, Grid, Typography } from "@mui/material";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import banner from "../assets/image/banner.png";
import { NavLink } from "react-router-dom";

const Homepage = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '76vh',
        }}>
            <Grid container spacing={2} sx={{
                marginTop: '30px'
            }}>
                <Grid item xs={6}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                    }}>
                        <div>
                            <Typography variant="h6" component="h1" sx={(theme) => ({
                                fontWeight: '600',
                                fontSize: '30px',
                                color: theme.palette.color.blue[100],
                            })}>
                                Hospital  Management System, your partner in hospital management
                            </Typography>

                            <Typography variant="p" component="p" sx={{
                                marginTop: '20px',
                                fontSize: '17px',
                                color: 'black',
                            }}>
                                We are committed to providing you with the best services to help you manage your hospital effectively.
                                Trust us to enhance operations, improve patient care, and optimize resources.
                            </Typography>
                        </div>

                        <NavLink to="/staffs" style={{textDecoration: 'none'}}>
                            <Box 
                                sx={{
                                    display: 'flex',
                                    marginBottom: '13%',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '10px',
                                    width: 'fit-content',
                                    borderRadius: '5px',
                                    fontSize: '17px',
                                    transition: '0.3s ease', 
                                    ":hover": (theme) => ({
                                        cursor: 'pointer',
                                        bgcolor: theme.palette.color.blue[400], 
                                    })
                                }}
                            >
                                <PlayCircleOutlineIcon sx={(theme) => ({
                                    color: theme.palette.color.blue[100],
                                    fontSize: '30px',
                                })}/>
                                <Typography variant="p" component="p">
                                    View our staffs
                                </Typography>
                            </Box>
                        </NavLink>
                    </Box>



                </Grid >

                <Grid item xs={6}>
                    <img src={banner} style={{
                        width: "100%",
                    }} alt="Hospital Banner"/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Homepage;