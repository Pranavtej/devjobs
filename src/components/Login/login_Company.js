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

export default function CompanyLogin() {

const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');
const nav = useNavigate();
const handleClick = async(event) => {
  event.preventDefault();
  
  setEmail(email)
  setPassword(password)

  const responce= await axios.post(`http://localhost:8000/loginCompany/${email}/${password}`,{
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Keep-Alive': 'timeout=60000'
    }});
  // console.log(responce);
  console.log(responce);
  if (responce.status === 200 && responce.data !== "") {
    localStorage.setItem('company_token', responce.data._id);
    localStorage.setItem('Company_id', JSON.stringify(responce.data._id));
    localStorage.setItem('recuiter', responce.data.RecruiterName);
    localStorage.setItem('company_name', responce.data.name);
    toast.success("Login Successful");
    setTimeout(() => {
        nav('/company');
    }, 2000);

  } else {
    toast.error("Invalid Credentials");
  }
}


  return (
    <CssVarsProvider>
      <main>
        <Toaster />
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
              <b>Welcome Recuiter !</b>
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="johndoe@email.com"
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

          <Button sx={{ mt: 1 /* margin top */ }} onClick={handleClick}>Log in</Button>
          <Typography
            endDecorator={<Link href="/companySignup">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}