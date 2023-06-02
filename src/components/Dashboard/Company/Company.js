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
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
// custom
import teamTheme from '.././theme';
import Menu from '../../Menu/menu';
import Layout from '../../Menu/layout';

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';



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
              <ListItemContent>Add Job</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemDecorator sx={{ color: 'neutral.500' }}>
                <AssignmentIndRoundedIcon fontSize="small" />
              </ListItemDecorator>
             <ListItemContent><Link href={`/postedJobs`} sx={{
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
             }>Posted jobs</Link></ListItemContent>
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

  const nav = useNavigate();

  const [title, setTitle] = React.useState('');
  const [skills, setSkills] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [salary, setSalary] = React.useState('');
  const [open, setOpen] = React.useState(false);


  const handleClick = async(event) => {
    event.preventDefault();

    setTitle(event.target.value);
    setSkills(event.target.value);
    setLocation(event.target.value);
    setSalary(event.target.value);
      
    const role = title;
    const company = localStorage.getItem("company_name");
    const Companyid = localStorage.getItem("company_token");
      try{
      const responce = await axios.post(`http://localhost:8000/PostJob/${title}/${company}/${location}/${salary}/${role}/${skills}/${Companyid}`);
      console.log(responce);
      if (responce){
        setOpen(true);
        console.log("Job Posted Succesfuly");
      }
      } 
      catch(err){
        console.log(err);
      }
  }

  return (
    
    <CssVarsProvider disableTransitionOnChange theme={teamTheme}>
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
          Job posted successfully ✨
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
             <code>Make sure to check posted jobs for the applicants</code> 
          </Typography>
        </Sheet>
      </Modal>
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
        {/* <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              pb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              fontSize="xs2"
              textColor="text.tertiary"
              textTransform="uppercase"
              letterSpacing="md"
              fontWeight="lg"
            >
              Filter by
            </Typography>
            <Button size="sm" variant="plain" sx={{ fontSize: 'xs', px: 1 }}>
              Clear filters
            </Button>
          </Box>
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="body2" textColor="text.primary">
                By keywords
              </Typography>
              <IconButton
                size="sm"
                variant="plain"
                color="primary"
                sx={{ '--IconButton-size': '24px' }}
              >
                <KeyboardArrowUpRoundedIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Autocomplete
                placeholder="Position, skills, etc…"
                options={[
                  {
                    category: 'Position',
                    title: 'Frontend engineer',
                  },
                  {
                    category: 'Position',
                    title: 'Backend engineer',
                  },
                  {
                    category: 'Position',
                    title: 'Product manager',
                  },
                  {
                    category: 'Skill',
                    title: 'JavaScript',
                  },
                  {
                    category: 'Skill',
                    title: 'TypeScript',
                  },
                  {
                    category: 'Skill',
                    title: 'Project management',
                  },
                ]}
                groupBy={(option) => option.category}
                getOptionLabel={(option) => option.title}
              />
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Chip
                  variant="soft"
                  size="sm"
                  endDecorator={<ChipDelete variant="soft" />}
                  sx={{ '--Chip-radius': (theme) => theme.vars.radius.sm }}
                >
                  UI designer
                </Chip>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="body2" textColor="text.primary">
                Location
              </Typography>
              <IconButton
                size="sm"
                variant="plain"
                color="primary"
                sx={{ '--IconButton-size': '24px' }}
              >
                <KeyboardArrowUpRoundedIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Autocomplete
                placeholder="Position, skills, etc…"
                options={[
                  // some of Thailand provinces
                  'Bangkok',
                  'Amnat Charoen',
                  'Ang Thong',
                  'Bueng Kan',
                  'Buriram',
                  'Chachoengsao',
                  'Chai Nat',
                  'Chaiyaphum',
                  'Chanthaburi',
                  'Chiang Mai',
                  'Chiang Rai',
                  'Chonburi',
                ]}
              />
              <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
                <Slider
                  valueLabelFormat={(value) => `${value} km`}
                  defaultValue={6}
                  step={1}
                  min={0}
                  max={20}
                  valueLabelDisplay="on"
                />
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="body2" textColor="text.primary">
                Education
              </Typography>
              <IconButton
                size="sm"
                variant="plain"
                color="primary"
                sx={{ '--IconButton-size': '24px' }}
              >
                <KeyboardArrowUpRoundedIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <RadioGroup name="education" defaultValue="any">
                <Radio label="Any" value="any" size="sm" />
                <Radio label="High School" value="high-school" size="sm" />
                <Radio label="College" value="college" size="sm" />
                <Radio label="Post-graduate" value="post-graduate" size="sm" />
              </RadioGroup>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="body2" textColor="text.primary">
                Previous experience
              </Typography>
              <IconButton
                size="sm"
                variant="plain"
                color="primary"
                sx={{ '--IconButton-size': '24px' }}
              >
                <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
          </Box>
        </Layout.SidePane> */}
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
           
              <Card variant="outlined"  sx={{ width: 300 , marginRight:'16px' }}>
             
          <div>
            <Typography level="h4" component="h1">
              <b>Post a Job </b>
            </Typography>
            <Typography level="body2">Please fill the details</Typography>
          </div>
          
          <FormControl>
            <FormLabel>Title of Job</FormLabel>
            <Input
              // html input attribute
              name="name"
              type="text"
              placeholder="job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
/>
          </FormControl>
          <FormControl>
            <FormLabel>Skills</FormLabel>
            <Input
              // html input attribute
              name="skills"
              type="text"
              placeholder="MERN , Nodejs , etc"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
/>
          </FormControl>
          <FormControl>
            <FormLabel>location</FormLabel>
            <Input
              // html input attribute
              name="location"
              type="text"
              placeholder="location : Delhi , Mumbai , etc"
              value={location}
              onChange={(e) => setLocation(e.target.value)}

            />
          </FormControl>
          <FormControl>
            <FormLabel>Salary</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="text"
              placeholder="Salary : $10000 , $20000 , etc"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </FormControl>


          <Button sx={{ mt: 1 /* margin top */ }}  onClick={handleClick}>Post Job</Button>
         
        
        
            </Card>
            
            </div>
          </List>
        </Box>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
