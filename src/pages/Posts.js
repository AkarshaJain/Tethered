import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Chip,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImageIcon from '@mui/icons-material/Image';
import TagIcon from '@mui/icons-material/Tag';
import { useApp } from '../context/AppContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 10,
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 10,
  marginBottom: theme.spacing(3),
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
  },
}));

const Posts = () => {
  const { user, allPosts, addPost, likePost } = useApp();
  const [newPostContent, setNewPostContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  
  // Handle post menu open
  const handlePostMenuOpen = (event, post) => {
    setMenuAnchorEl(event.currentTarget);
    setCurrentPost(post);
  };
  
  // Handle post menu close
  const handlePostMenuClose = () => {
    setMenuAnchorEl(null);
    setCurrentPost(null);
  };
  
  // Handle new post submission
  const handlePostSubmit = () => {
    if (newPostContent.trim()) {
      // Pass an object that includes both content and the anonymous flag.
      addPost({ content: newPostContent, anonymous: isAnonymous });
      setNewPostContent('');
      setIsAnonymous(false);
    }
  };
  
  // Handle post like
  const handleLike = (postId) => {
    likePost(postId);
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Filter posts based on active tab
  const filteredPosts = () => {
    switch (activeTab) {
      case 0: // All
        return allPosts;
      case 1: // Featured
        return allPosts.filter(post => post.likes > 50);
      case 2: // Popular
        return [...allPosts].sort((a, b) => b.likes - a.likes);
      case 3: // Recent
        return [...allPosts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      default:
        return allPosts;
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      {/* Create Post Section */}
      <StyledPaper sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Avatar src={user.avatar} sx={{ width: 48, height: 48 }} />
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              maxRows={4}
              placeholder="Share your thoughts or insights..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Post Anonymously"
                />
                <Button startIcon={<ImageIcon />} sx={{ color: '#61082b' }}>
                  Photo
                </Button>
                <Button startIcon={<TagIcon />} sx={{ color: '#61082b' }}>
                  Tag
                </Button>
              </Box>
              <Button
                variant="contained"
                onClick={handlePostSubmit}
                disabled={!newPostContent.trim()}
                sx={{
                  backgroundColor: '#61082b',
                  '&:hover': {
                    backgroundColor: '#484b50',
                  },
                }}
              >
                Post
              </Button>
            </Box>
          </Box>
        </Box>
      </StyledPaper>
      
      {/* Tabs */}
      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{ 
            '& .MuiTab-root': { textTransform: 'none' },
            '& .Mui-selected': { color: '#61082b' },
            '& .MuiTabs-indicator': { backgroundColor: '#61082b' } 
          }}
        >
          <Tab label="All Posts" />
          <Tab label="Featured" />
          <Tab label="Popular" />
          <Tab label="Recent" />
        </Tabs>
      </Box>
      
      {/* Posts List */}
      <Grid container spacing={3}>
        {filteredPosts().map(post => (
          <Grid item xs={12} key={post.id}>
            <StyledCard>
              <CardHeader
                avatar={
                  <Avatar src={post.author.avatar} />
                }
                action={
                  <IconButton 
                    aria-label="settings"
                    onClick={(e) => handlePostMenuOpen(e, post)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                }
                title={
                  <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>
                      {post.anonymous ? 'Anonymous' : post.author.name}
                    </Typography>
                    {!post.anonymous && (
                      <Typography variant="body2" color="text.secondary">
                        @{post.author.username}
                      </Typography>
                    )}
                  </Box>
                }
                subheader={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(post.timestamp)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                      •
                    </Typography>
                    <Chip 
                      label={post.author.role}
                      size="small"
                      sx={{ 
                        height: 20,
                        fontSize: '0.7rem', 
                        backgroundColor: 'rgba(46, 59, 85, 0.1)',
                        color: '#61082b'
                      }}
                    />
                  </Box>
                }
              />
              
              <CardContent>
                <Typography variant="body1" paragraph>
                  {post.content}
                </Typography>
                
                {post.image && (
                  <Box sx={{ borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                    <img 
                      src={post.image} 
                      alt="Post attachment" 
                      style={{ 
                        width: '100%', 
                        maxHeight: 400, 
                        objectFit: 'cover' 
                      }} 
                    />
                  </Box>
                )}
                
                {post.tags && post.tags.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                    {post.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(46, 59, 85, 0.1)',
                          color: '#61082b'
                        }}
                      />
                    ))}
                  </Box>
                )}
              </CardContent>
              
              <Divider />
              
              <CardActions disableSpacing>
                <Button
                  startIcon={<ThumbUpIcon />}
                  size="small"
                  onClick={() => handleLike(post.id)}
                  sx={{ color: '#61082b' }}
                >
                  {post.likes > 0 ? post.likes : 'Like'}
                </Button>
                
                <Button
                  startIcon={<CommentIcon />}
                  size="small"
                  sx={{ color: '#61082b' }}
                >
                  {post.comments > 0 ? post.comments : 'Comment'}
                </Button>
                
                <Button
                  startIcon={<ShareIcon />}
                  size="small"
                  sx={{ color: '#61082b' }}
                >
                  {post.shares > 0 ? post.shares : 'Share'}
                </Button>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      
      {/* Post Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handlePostMenuClose}
      >
        <MenuItem onClick={handlePostMenuClose}>Save Post</MenuItem>
        <MenuItem onClick={handlePostMenuClose}>Report Post</MenuItem>
        <MenuItem onClick={handlePostMenuClose}>Hide Post</MenuItem>
      </Menu>
    </Container>
  );
};

export default Posts;
