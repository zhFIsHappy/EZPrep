import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CodeIcon from '@mui/icons-material/Code';
import { Link, useLocation } from "react-router-dom";

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props: StyledTabProps) =>
  <Tab disableRipple {...props} sx={{ height: '70px' }} iconPosition="start" />
)(
  ({ theme }) => ({
    textTransform: 'none',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.85)',
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&.Mui-selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#d1eaff',
    },
  }),
);

interface StyledTabProps {
  label: string;
  value?: string;
  to?: string;
  component?: React.ElementType;
  icon?: any;
}

export default function TabsHeader() {
  const location = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {

  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ bgcolor: '#fff' }}>
        <AntTabs value={location.pathname} onChange={handleChange} aria-label="ant example">
          <AntTab label="Problem Set" value="/problemset" to="/problemset" component={Link} icon={<LibraryBooksIcon/>} />
          <AntTab label="Submission" value="/submissions" to="/submissions" component={Link} icon={<CodeIcon />} />
        </AntTabs>
      </Box>
    </Box>
  );
}
