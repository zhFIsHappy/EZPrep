import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CodeIcon from "@mui/icons-material/Code";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { appState } from "../appState";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import Cookies from "js-cookie";

const AntTabs = styled(Tabs)({
  // borderBottom: '1px solid #e8e8e8',
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} sx={{ height: "70px" }} iconPosition="start" />
))(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: "rgba(0, 0, 0, 0.85)",
  "&:hover": {
    color: "#40a9ff",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "#1890ff",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "#d1eaff",
  },
}));

interface StyledTabProps {
  label: string;
  value?: string;
  to?: string;
  component?: React.ElementType;
  icon?: any;
}

export default function TabsHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const navigate = useNavigate();
  const generateAvatarDOM = () => {
    return (
      <Avatar sx={{ bgcolor: "primary.main" }}>
        {appState.userName[0].toUpperCase()}
      </Avatar>
    );
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onLogoutClick = async () => {
    appState.token = null;
    appState.isLoggedIn = false;
    appState.userId = 0;
    appState.userName = "";
    Cookies.remove("token");
    window.location.reload();
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {};

  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderBottom: "1px solid #e8e8e8",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff",
            width: "80%",
            minWidth: "640px",
            maxWidth: "1080px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AntTabs
            value={location.pathname}
            onChange={handleChange}
            aria-label="ant example"
          >
            <AntTab
              label="Problem Set"
              value="/problemset"
              to="/problemset"
              component={Link}
              icon={<LibraryBooksIcon />}
            />
            <AntTab
              label="Submission"
              value="/submissions"
              to="/submissions"
              component={Link}
              icon={<CodeIcon />}
            />
          </AntTabs>
          {appState.isLoggedIn ? (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {generateAvatarDOM()}
              <Menu
                sx={{ marginTop: "7px" }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMouseLeave}
                onMouseLeave={handleMouseLeave}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem component={Link} to="/profile">
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>User profile</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText onClick={() => navigate("/edit-profile")}>
                    Preference settings
                  </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={onLogoutClick}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Log out</ListItemText>
                </MenuItem>
              </Menu>
              <span></span>
            </div>
          ) : (
            <div>
              <Button
                variant="outlined"
                style={{ textTransform: "none", marginRight: "10px" }}
                href="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                style={{ textTransform: "none" }}
                href="/register"
              >
                Register
              </Button>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}
