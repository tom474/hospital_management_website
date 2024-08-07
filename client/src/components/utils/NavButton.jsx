import { MenuItem, Typography } from "@mui/material"
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

export const NavButton = ({ location, title }) => {
    return (
        <NavLink style={{
            textDecoration: 'none',
        }} to={`${location}`}>
            <MenuItem
                sx={{ py: '6px', px: '12px' }}
            >
                <Typography variant="body2" color="text.primary">
                    {title}
                </Typography>
            </MenuItem>
        </NavLink>
    )
}

NavButton.propTypes = {
    location: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};