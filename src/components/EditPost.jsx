import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDropzone } from 'react-dropzone';
import { usePosts } from '../context/PostsContext';

const Input = styled('input')({
  display: 'none',
});

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, updatePost } = usePosts();
  const [post, setPost] = useState({
    id: '',
    title: '',
    content: '',
    author: '',
    date: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const existingPost = posts.find(p => p.id === parseInt(id));
    if (existingPost) {
      setPost(existingPost);
    }
  }, [id, posts]);

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

  const handleUpdate = (e) => {
    e.preventDefault();
    if (validate()) {
      updatePost(post);
      alert('Post updated');
      navigate(`/post/${id}`);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <Container component="main" maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Paper elevation={6} sx={{ padding: '2rem', borderRadius: '8px', backgroundColor: '#fff' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Post
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleUpdate}>
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
              <Typography variant="body1">Current Image</Typography>
              <img src={post.image} alt="Post" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '1rem' }} />
            </Box>
          )}
          <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 3 }}>
            Update
          </Button>
          <Button variant="contained" onClick={() => navigate(`/post/${id}`)} sx={{ mt: 2 }}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditPost;
