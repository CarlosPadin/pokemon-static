import { Box, Typography } from "@mui/material";

const NoFavorites = () => {
  return (
    <Box sx={{ 
        width: '100%', 
        height: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    }}>
      <Typography variant="h2">No Favorites</Typography>
    </Box>
  );
};

export default NoFavorites;
