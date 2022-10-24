import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import ShieldIcon from '@mui/icons-material/Shield';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Avatar, Container } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
const pages = ['ORDENES ACTIVAS','BUSCAR ORDEN'];

export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    //console.log('me accione')
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const navigate = useNavigate();
  // const {dispatch} = useContext(AuthContext);

  // const handleLogout = () => {
  //   const action = {
  //     type : types.logout
  //   }
  //   dispatch(action);
  //   localStorage.removeItem('user');
  //   navigate("/login", {
  //     replace: true,
  //   });
  // }
  // const darkTheme = createTheme({
  //   palette: {
  //     mode: 'dark',
  //     primary: {
  //       main: '#1976d2',
  //     },
  //   },
  // });
  // const { user } = useContext(AuthContext);
  return (
    <>
        <AppBar position="static" color="primary">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <FastfoodIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                style={({ isActive }) => {
                  return {
                    display: "block",

                    color: isActive ? "red" : "",
                  };
                }}
                component={NavLink}
                to={"/"}
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Mr.Charro
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <ShieldIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Mr.Charro
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}

                >
                  <MenuItem style={({ isActive }) => {
                    return {
                      display: "block",
                      color: isActive ? "red" : "",
                    };
                  }} component={NavLink} to={"/ordenes"}>
                    Ordenes Activas
                  </MenuItem>
                </Button>
                {/* <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}

                >
                  <MenuItem style={({ isActive }) => {
                    return {
                      display: "block",
                      color: isActive ? "red" : "",
                    };
                  }} component={NavLink} to={"/pagar"}>
                    Pagar
                  </MenuItem>
                </Button> */}
                <Button
                  sx={{ my: 2, color: 'white', display: 'block' }}

                >
                  <MenuItem style={({ isActive }) => {
                    return {
                      display: "block",
                      color: isActive ? "red" : "",
                    };
                  }} component={NavLink} to={"/buscar"}>
                    Buscar Orden
                  </MenuItem>
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      <Outlet />
    </>
  );
};