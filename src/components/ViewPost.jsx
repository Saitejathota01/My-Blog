import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper, Divider, Grid } from '@mui/material';
import { usePosts } from '../context/PostsContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D3B66', // Dark blue
    },
    secondary: {
      main: '#FAF0CA', // Light yellow
    },
    background: {
      default: '#f6da76', // Background color
    },
    text: {
      primary: '#3D5A80', 
      secondary: '#293241', 
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h3: {
      fontWeight: 700,
      fontSize: '2.5rem', 
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem', 
    },
    body1: {
      fontSize: '1.1rem', 
    },
    button: {
      textTransform: 'none', 
    },
  },
});

const ViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts } = usePosts();
  const post = posts.find(post => post.id === parseInt(id));

  if (!post) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Post not found.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/home')}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={6} sx={{ padding: '2rem', backgroundColor: 'white' }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
              {post.title}
            </Typography>
            {post.image && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <img src={post.image} alt={post.title} style={{ maxWidth: '100%', borderRadius: '8px' }} />
              </Box>
            )}
            <Divider sx={{ marginBottom: '2rem' }} />
            <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: '2rem' }}>
              {post.content}
            </Typography>
            <Divider sx={{ marginBottom: '2rem' }} />
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button variant="contained" color="primary" onClick={() => navigate(`/edit/${id}`)}>
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="secondary" onClick={() => navigate('/home')}>
                  Back to Home
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default ViewPost;
