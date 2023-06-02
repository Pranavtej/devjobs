import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Autocomplete from '@mui/joy/Autocomplete';
import Avatar from '@mui/joy/Avatar';

import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Slider from '@mui/joy/Slider';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';
import TextField from '@mui/joy/TextField';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';

import Card from '@mui/joy/Card';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import Link from '@mui/joy/Link';

// Icons import
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import axios from 'axios';

// custom
import teamTheme from './theme';
import Menu from '../Menu/menu';
import Layout from '../Menu/layout';


import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';


export  function BasicModal() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            This is the modal title
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            Make sure to use <code>aria-labelledby</code> on the modal dialog with an
            optional <code>aria-describedby</code> attribute.
          </Typography>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="primary"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

function TeamNav() {
  return (
    <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
      <ListItem nested>
        <ListSubheader>
          Browse
          <IconButton
            size="sm"
            variant="plain"
            color="primary"
            sx={{ '--IconButton-size': '24px', ml: 'auto' }}
          >
            <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
          </IconButton>
        </ListSubheader>
        <List
          aria-labelledby="nav-list-browse"
          sx={{
            '& .JoyListItemButton-root': { p: '8px' },
          }}
        >
          <ListItem>
            <ListItemButton variant="soft" color="primary">
              <ListItemDecorator sx={{ color: 'inherit' }}>
                <PeopleRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Jobs</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <AssignmentIndRoundedIcon fontSize="small" />
              </ListItemDecorator>
             <ListItemContent><Link href={`/appliedJobs`} sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'inherit',
                fontSize: 'inherit',
                '&:hover': {
                    textDecoration: 'none',
                    color: 'inherit',
                    fontWeight: 'inherit',
                },
                
             }
             }>Applied Jobs</Link></ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <ArticleRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Profile</ListItemContent>
              <Chip
                variant="soft"
                color="info"
                size="sm"
                sx={{ borderRadius: 'sm' }}
              >
                Under Construction  
              </Chip>
            </ListItemButton>
          </ListItem>
        </List>
      </ListItem>
    </List>
  );
}

export default function TeamExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [data, setData] = React.useState([]); // initialize the state with an empty array

  const token = localStorage.getItem('token');
  const User = JSON.parse(localStorage.getItem('user'));
  const [open, setOpen] = React.useState(false);

  

const applyJob = async (id) => {
    try {
      console.log(id);
      const response = await axios.post(`http://localhost:8000/apply/${token}/${id}`);
      setOpen(true);
      data.filter((item) => item._id === id)[0].applied = true;
      console.log(response);
      document.location.reload();
    } catch (error) {
      console.error(error);
    }
};


  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/jobs');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <React.Fragment>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
          />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
          Succesfuly Applied for the Job ✨
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
             <code>Make sure to check  your Applied Jobs section for more details</code> 
          </Typography>
        </Sheet>
      </Modal>
    <CssVarsProvider disableTransitionOnChange theme={teamTheme}>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <TeamNav />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="solid"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              <GroupRoundedIcon />
            </IconButton>
            <Typography component="h1" fontWeight="xl">
              Devjobs
            </Typography>
          </Box>
          {/* <Input
            size="sm"
            placeholder="Search anything…"
            startDecorator={<SearchRoundedIcon color="primary" />}
            endDecorator={
              <IconButton variant="outlined" size="sm" color="neutral">
                <Typography fontWeight="lg" fontSize="sm" textColor="text.tertiary">
                  /
                </Typography>
              </IconButton>
            }
            sx={{
              flexBasis: '500px',
              display: {
                xs: 'none',
                sm: 'flex',
              },
            }}
          /> */}
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
            >
              {/* <SearchRoundedIcon /> */}
            </IconButton>
            {/* <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              component="a"
              href="/blog/first-look-at-joy/"
            >
              <BookRoundedIcon />
            </IconButton> */}
            {/* <Menu
              id="app-selector"
              control={
                <IconButton
                  size="sm"
                  variant="outlined"
                  color="primary"
                  aria-label="Apps"
                >
                  <GridViewRoundedIcon />
                </IconButton>
              }
              menus={[
                {
                  label: 'Email',
                  href: '/joy-ui/getting-started/templates/email/',
                },
                {
                  label: 'Team',
                  active: true,
                  href: '/joy-ui/getting-started/templates/team/',
                  'aria-current': 'page',
                },
                {
                  label: 'Files',
                  href: '/joy-ui/getting-started/templates/files/',
                },
              ]}
            /> */}
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
        <Layout.SideNav>
          <TeamNav />
        </Layout.SideNav>
        <Layout.Main>
        <Box sx={{ p: 2 }}>
          <List
            sx={{
                display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(1000px, 1fr))',
              gap: 2,
                //  display: 'flex',
                // gap: 2,
               
                // scrollBehavior: 'smooth',
                // '-webkit-overflow-scrolling': 'touch',
            
              
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {data.map((_, index) => {
                if (_.applicants.includes(token)) {
                  return null; // Skip rendering if `applied` is true
                }
            
            return(
              <Card variant="outlined" key={index} sx={{ width: 300 , marginRight:'16px' }}>
              <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                {_.title}
              </Typography>
              <Typography level="body2">posted on {_.postedtime}</Typography>
              <IconButton
                aria-label="bookmark Bahamas Islands"
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
              >
                <BookmarkAdd />
              </IconButton>

              <Typography level="body2">Skills : </Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Chip

                    variant="soft"
                    size="sm"
                    sx={{ '--Chip-radius': (theme) => theme.vars.radius.sm }}
                    >
                    {_.skills[0]}
                    </Chip>
                </Box>
              {/* <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
                {/* <img
                  src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
                  srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                /> 
                
              </AspectRatio> */}

              <Box sx={{ display: 'flex' }}>
                <div>
                    <Typography level="body3">company</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                 {_.company}
                    </Typography>
                </div>
                </Box>
            
              <Box sx={{ display: 'flex' }}>
                <div>
                  <Typography level="body3">Salary</Typography>
                  <Typography fontSize="lg" fontWeight="lg">
                    {_.salary}
                  </Typography>
                </div>
                <Button
                  variant="solid"
                  size="sm"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  id={_.id}
                  sx={{ ml: 'auto', fontWeight: 600 }}
                  onClick={() => {applyJob(_._id)} }    
                  disabled={buttonDisabled}              
                >
                  Easy Apply
                </Button>
              </Box>
            </Card>
)})}
            </div>
          </List>
        </Box>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
    </React.Fragment>
  );
}
