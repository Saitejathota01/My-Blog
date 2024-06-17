import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Button, Card, CardActions, CardMedia, CardContent, Box, TextField, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
      default: '#F4D35E', // Background color
    },
    text: {
      primary: '#3D5A80', // Darker text
      secondary: '#293241', // Lighter text
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h3: {
      fontWeight: 700,
      fontSize: '2.5rem', // Adjusted size
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem', // Adjusted size
    },
    body1: {
      fontSize: '1.1rem', // Adjusted size
    },
    button: {
      textTransform: 'none', // Keep button text casing normal
    },
  },
});

const Home = () => {
  const { posts } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg" sx={{ flexGrow: 1, padding: '2rem' }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: 'text.primary' }}>
            My Blog
          </Typography>
          <TextField
            fullWidth
            label="Search Posts"
            variant="outlined"
            sx={{ mb: 4, backgroundColor: 'secondary.main' }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/create"
            startIcon={<AddIcon />}
            sx={{ mb: 4, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Create New Post
          </Button>
          <Grid container spacing={4}>
            {currentPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card sx={{ position: 'relative', overflow: 'hidden', '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.5s' } }}>
                  {post.image && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={post.image}
                      alt={post.title}
                    />
                  )}
                  <CardContent sx={{ background: 'rgba(255,255,255,0.8)', textAlign: 'center', padding: '1rem' }}>
                    <Typography variant="h5" component={Link} to={`/post/${post.id}`} sx={{ color: 'text.secondary', textDecoration: 'none' }}>
                      {post.title}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', background: 'rgba(0,0,0,0.5)', padding: '1rem' }}>
                    <Button size="small" component={Link} to={`/post/${post.id}`} sx={{ color: 'white' }}>
                      Read More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Pagination count={Math.ceil(filteredPosts.length / postsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
