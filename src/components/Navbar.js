import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Avatar, 
  InputBase, 
  Badge, 
  Menu, 
  MenuItem, 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import { useApp } from '../context/AppContext';

// Styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#61082b',
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  letterSpacing: 1,
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user } = useApp();
  const location = useLocation();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const menuId = 'primary-search-account-menu';
  
  const navItems = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'Posts', icon: <GroupIcon />, path: '/posts' },
    { label: 'Founders', icon: <PeopleIcon />, path: '/founders' },
    { label: 'Businesses', icon: <BusinessIcon />, path: '/businesses' },
    { label: 'Chats', icon: <ForumIcon />, path: '/chats' },
    { label: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];
  
  const isMenuOpen = Boolean(anchorEl);
  
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* When clicked, these could trigger navigation too */}
      <MenuItem 
        onClick={handleMenuClose}
        component={Link}
        to="/profile"
      >
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );
  
  const drawer = (
    <Box sx={{ textAlign: 'center', width: 250 }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
        Tethered
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            key={item.label}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={() => setDrawerOpen(false)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'rgba(46, 59, 85, 0.1)',
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
  
  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Box 
            component={Link}
            to="/"
            sx={{ 
              textDecoration: 'none', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer'
            }}
          >
            <LogoText variant="h6" component="div">
              Tethered
            </LogoText>
          </Box>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {!isMobile && (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navItems.map((item) => (
                <Button 
                  key={item.label} 
                  component={Link}
                  to={item.path}
                  color="inherit"
                  startIcon={item.icon}
                  sx={{ 
                    ml: 1, 
                    textTransform: 'none',
                    backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
          
          <Box sx={{ display: 'flex' }}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <Badge badgeContent={2} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar 
                alt={user?.name} 
                src={user?.avatar} 
                sx={{ width: 32, height: 32 }} 
              />
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
      
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {drawer}
      </Drawer>
      
      {renderMenu}
      
      {/* Toolbar placeholder for proper spacing */}
      <Toolbar />
    </>
  );
};

export default Navbar;
