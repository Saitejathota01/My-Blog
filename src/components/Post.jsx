import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = {
    id,
    title: 'Sample Post',
    content: 'This is a sample post content.'
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    // Handle delete logic here
    alert('Post deleted');
    navigate('/home');
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body1" paragraph>
        {post.content}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleEdit} sx={{ marginRight: '1rem' }}>
        Edit
      </Button>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete
      </Button>
      <Button variant="contained" component={Link} to="/home" sx={{ marginLeft: '1rem' }}>
        Back to Home
      </Button>
    </Container>
  );
};

export default Post;
