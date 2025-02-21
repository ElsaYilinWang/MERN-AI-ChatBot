import { Box, Typography } from '@mui/material';

const NotFound = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <Typography variant="h2" component="h1">
      404 - Page Not Found
    </Typography>
  </Box>
);

export default NotFound;