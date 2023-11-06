import { Mail, ModeNight, Notifications, Pets } from "@mui/icons-material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from "@mui/icons-material/Search";
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    InputBase,
    Menu,
    MenuItem,
    Switch,
    Toolbar,
    Typography,
    alpha,
    styled,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: 'space-between',
});
const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.5),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.75),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
        display: "flex",
    },
}));
const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
        display: "none",
    },
}));

export const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useContext(AppContext);
    // console.log(mode)
    const [user, setUser] = useState({})
    const uid = localStorage.getItem('uid')
    useEffect(() => {
        axios.get(`http://localhost:5000/auth/${uid}`).then((res) => {
            setUser(res.data.user)
            localStorage.setItem('items', JSON.stringify(res.data.user))
        }).catch((err) => console.log(err))
    }, [])
    return (
        <AppBar position="sticky">
            <StyledToolbar>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
                        MERN MEDIA
                    </Typography>
                    <Pets sx={{ display: { xs: "block", sm: "none" } }} />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', cursor: 'pointer' }}>
                    <Box sx={{
                        padding: "0 15px", textAlign: "center", '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change the background color on hover
                        }
                    }} onClick={() => navigate('/')}>
                        <HomeIcon />
                        <Typography>Home</Typography>
                    </Box>
                    <Box sx={{
                        padding: "0 15px", textAlign: "center", '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change the background color on hover
                        }
                    }} onClick={() => navigate('/')}>
                        <PermMediaIcon />
                        <Typography>Media</Typography>
                    </Box>
                    <Box sx={{
                        padding: "0 15px", textAlign: "center", '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change the background color on hover
                        }
                    }} onClick={() => navigate('/')}>
                        <PersonIcon />
                        <Typography>Friends</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: "flex", alignItems: 'center' }}>
                        {mode === 'light' ? <DarkModeIcon /> : <ModeNight />}  
                        <Switch
                            color={mode === 'light' ? "secondary": "primary"}
                            onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
                        />
                    </Box>
                    <Icons>
                        <Badge badgeContent={4} color="error">
                            <Mail />
                        </Badge>
                        <Badge badgeContent={2} color="error">
                            <Notifications />
                        </Badge>
                        <Avatar
                            sx={{ width: 30, height: 30 }}
                            src={user?.photo}
                            onClick={(e) => setOpen(true)}
                        />
                    </Icons>
                    <UserBox onClick={(e) => setOpen(true)}>
                        <Avatar
                            sx={{ width: 30, height: 30 }}
                            src={user?.photo}
                        />
                        <Typography variant="span">{user?.username}</Typography>
                    </UserBox>
                </Box>


            </StyledToolbar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={(e) => setOpen(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
            </Menu>
        </AppBar>
    );
};
