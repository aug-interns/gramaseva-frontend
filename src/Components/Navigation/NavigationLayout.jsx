import { ChevronLeft, ChevronRight, Home, ManageAccounts } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar as MuiAppBar, Box, Drawer, IconButton, Toolbar, Typography, styled, Divider, List, ListItem, ListItemButton, useTheme, ListItemIcon, ListItemText, Stack, Button } from "@mui/material"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import { ROLES } from "../../Constants/Roles";
import { useAuthContext } from "@asgardeo/auth-react";

const drawerWidth = 250;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flex: 1,
    flexGrow: 1,
    maxWidth: '100%',
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      maxWidth: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const NavigationLayout = () => {

    const theme = useTheme();
    const navigate = useNavigate();
    const { signOut, state } = useAuthContext()

    const [ open, setDrawerOpen ] = useState(false);

    const handleDrawerOpen = () => { setDrawerOpen(true) }
    const handleDrawerClose = () => { setDrawerOpen(false) }

    const routes = [
        { name: 'Home', route: '/home', icon: <Home/>, visibility: ROLES.ANY },
        { name: 'My Profile', route: '/profile', icon: <ManageAccounts/>, visibility: ROLES.ANY }
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                  <Stack direction={'row'} justifyContent={'space-between'} sx={ { width: '100%' } } alignItems={'center'}>
                    <Stack direction={'row'} alignItems={'center'}>
                      <IconButton
                          color="inherit"
                          aria-label="open drawer"
                          onClick={handleDrawerOpen}
                          edge="start"
                          sx={{ mr: 2, ...(open && { display: 'none' }) }}
                      >
                          <MenuIcon/>
                      </IconButton>
                      <Typography variant="h6">
                        <strong>Grama</strong>Check
                      </Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                      <Typography>{state.username}</Typography>
                      <Button variant="outlined" color="inherit" onClick={() => signOut()}>Logout</Button>
                    </Stack>
                  </Stack>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                {routes.map(item => {
                  return (
                      <ListItem disablePadding key={item.route}>
                          <ListItemButton onClick={() => { navigate(item.route) } }>
                              <ListItemIcon>
                                  {item.icon}
                              </ListItemIcon>
                              <ListItemText primary={item.name} />
                          </ListItemButton>
                      </ListItem>
                  )
                })}
                </List>
            </Drawer>
            <Main open={open}>
                <Toolbar/>
                <Outlet/>
            </Main>
        </Box>
    )
}