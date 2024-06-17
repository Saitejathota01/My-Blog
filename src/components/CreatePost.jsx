import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { usePosts } from '../context/PostsContext';
import { useDropzone } from 'react-dropzone';

const Input = styled('input')({
  display: 'none',
});

const CreatePost = () => {
  const navigate = useNavigate();
  const { addPost } = usePosts();
  const [post, setPost] = useState({
    title: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    image: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPost((prevPost) => ({
        ...prevPost,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.title = post.title ? "" : "This field is required.";
    tempErrors.content = post.content ? "" : "This field is required.";
    tempErrors.author = post.author ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (validate()) {
      addPost(post);
      alert('Post created');
      navigate('/home');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Paper elevation={6} sx={{ padding: '2rem', borderRadius: '8px', backgroundColor: '#fff' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Post
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleCreate}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                value={post.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Content"
                name="content"
                value={post.content}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={!!errors.content}
                helperText={errors.content}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Author"
                name="author"
                value={post.author}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!errors.author}
                helperText={errors.author}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={post.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: '8px',
                  padding: '1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  mt: 2
                }}
              >
                <input {...getInputProps()} />
                <Typography>Drag & drop an image here, or click to select one</Typography>
              </Box>
              {post.image && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <img src={post.image} alt="Post" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '1rem' }} />
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 3 }}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreatePost;
