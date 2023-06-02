import React from 'react';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TwoSidedLayout from './layout';

export default function Index() {
  return (

    <TwoSidedLayout>
    
         <Typography color="secondary" variant="lg" fontWeight="bold">
        Get hired with Top Companies
      </Typography>
      <Typography
        variant="h1"
        fontWeight="bold"
        color='primary'
        fontSize="clamp(1.875rem, 1.3636rem + 2.1818vw, 3rem)"
      >
        Find your dream job with us today!
      </Typography>
      <Typography fontSize="lg" color="text.secondary" lineHeight="lg">
        We are a team of talented and passionate people who love what we do.
      </Typography>
      <Link href={`/signup`} ><Button size="lg" endIcon={<ArrowForwardIcon/>}>
        Get Started
      </Button></Link>
      <Typography>
        Already a member? <Link href={`/login`} fontWeight="bold">Sign in</Link>
      </Typography>

      <Typography
        variant="body3"
        style={{
          position: 'absolute',
          top: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
      </Typography>

      <Typography>
        Looking for Skilled people ?  <Link href={`/companyLogin`} fontWeight="bold">Hire from us</Link>
      </Typography>
      </TwoSidedLayout>

  );
}
