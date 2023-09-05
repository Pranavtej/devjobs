import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Modal from '@mui/joy/Modal';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

export default function ComapanySignup() {
  const nav = useNavigate();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
    const [location, setLocation] = React.useState('');

  const handleClick = async(event) => {
    event.preventDefault();

    setName(name)
    setEmail(email)
    setPassword(password)
    setConfirmPassword(confirmPassword)
    setCompanyName(companyName)
   
    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      
      try{
      const responce = await axios.post(`https://devjobs-backend-bmj6.onrender.com/createCompany/${name}/${companyName}/${email}/${password}/${location}`);
      console.log(responce);
      if (responce){
        console.log("Account created successfully");
        nav("/companyLogin");

      }
      } 
      catch(err){
        console.log(err);
      }

     }

  }

  return (

    <CssVarsProvider>
      <Toaster 
            position="top-right"
            reverseOrder={false}
            />
      <main>
        {/* <ModeToggle /> */}
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Complete your account!</b>
            </Typography>
            <Typography level="body2">Sign up to continue and hire . </Typography>
          </div>
          
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              // html input attribute
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
/>
          </FormControl>
          <FormControl>
            <FormLabel>Company Name</FormLabel>
            <Input
              // html input attribute
              name="name"
              type="text"
              placeholder="Comapny Name Ex: Amazon , Google etc"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
/>
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input
              // html input attribute
              name="name"
              type="text"
              placeholder="India , USA etc"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
/>
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="johndoe@google.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
/>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>


          <Button sx={{ mt: 1 /* margin top */ }}  onClick={handleClick}>Create account    </Button>
         
          <Typography
            endDecorator={<Link href="/login">Sign in</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Already have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}