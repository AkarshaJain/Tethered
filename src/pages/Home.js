import React from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Avatar, 
  Divider, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Chip 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  borderRadius: 10,
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  borderRadius: 10,
  overflow: 'hidden',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const Home = () => {
  const { user, allUsers, allPosts, allChatGroups } = useApp();
  
  // Get trending topics from posts
  const getTrendingTopics = () => {
    const tags = allPosts.flatMap(post => post.tags);
    const tagCounts = {};
    
    tags.forEach(tag => {
      if (tag) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    });
    
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag]) => tag);
  };
  
  const trendingTopics = getTrendingTopics();
  
  // Get recommended users based on roles and skills
  const getRecommendedUsers = () => {
    return allUsers
      .filter(u => u.id !== user.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  };
  
  const recommendedUsers = getRecommendedUsers();
  
  // Get latest posts
  const latestPosts = allPosts.slice(0, 3);
  
  // Get upcoming events (simulated)
  const upcomingEvents = [
    {
      id: 1,
      title: 'Startup Funding Workshop',
      date: 'August 25, 2023',
      location: 'Virtual',
    },
    {
      id: 2,
      title: 'Networking Mixer',
      date: 'September 2, 2023',
      location: 'New York City',
    },
    {
      id: 3,
      title: 'Tech Startup Conference',
      date: 'September 15, 2023',
      location: 'San Francisco',
    },
  ];
  
  // Get popular chat groups
  const popularChatGroups = [...allChatGroups]
    .sort((a, b) => b.members - a.members)
    .slice(0, 3);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Welcome Section */}
      <StyledPaper sx={{ mb: 4, backgroundColor: '#61082b', color: 'white' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Welcome back, {user.name}!
            </Typography>
            <Typography variant="body1" paragraph>
              Connect with entrepreneurs, share ideas, and grow your network!
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button 
                variant="contained" 
                component={Link} 
                to="/posts"
                sx={{ 
                  backgroundColor: 'white', 
                  color: '#61082b',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  }
                }}
              >
                Latest Posts
              </Button>
              <Button 
                variant="outlined" 
                component={Link} 
                to="/chats"
                sx={{ 
                  borderColor: 'white', 
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Join Discussions
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ position: 'relative', height: 200 }}>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Entrepreneurs meeting"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
      
      {/* Find Founders Section (NEW) */}
      <StyledPaper sx={{ mb: 4, backgroundColor: '#fff' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ position: 'relative', height: 200 }}>
              <img 
                src="https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Entrepreneurs networking"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: 8,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom sx={{ color: '#61082b' }}>
              Find Founders in Your Industry
            </Typography>
            <Typography variant="body1" paragraph>
              Connect with founders based on funding stage, industry, location, and more. 
              Our advanced filtering helps you find the perfect match for partnerships, 
              investments, or mentorship opportunities.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button 
                variant="contained" 
                component={Link} 
                to="/founders"
                startIcon={<PeopleIcon />}
                sx={{ 
                  backgroundColor: '#61082b',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#484b50',
                  }
                }}
              >
                Find Founders
              </Button>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
      
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Trending Topics */}
          <StyledPaper sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUpIcon sx={{ mr: 1, color: '#61082b' }} />
              <Typography variant="h6">Trending Topics</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {trendingTopics.map((topic, index) => (
                <Chip 
                  key={index} 
                  label={topic} 
                  sx={{ 
                    backgroundColor: '#61082b', 
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#484b50',
                    }
                  }} 
                />
              ))}
            </Box>
          </StyledPaper>
          
          {/* Latest Posts Preview */}
          <Typography variant="h6" sx={{ mb: 2 }}>Latest Posts</Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {latestPosts.map(post => (
              <Grid item xs={12} key={post.id}>
                <StyledCard>
                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar src={post.author.avatar} />
                      <Box sx={{ ml: 1 }}>
                        <Typography variant="subtitle1">{post.author.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(post.timestamp).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" paragraph>
                      {post.content.length > 150 
                        ? `${post.content.substring(0, 150)}...` 
                        : post.content}
                    </Typography>
                    
                    {post.tags.length > 0 && (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                        {post.tags.map((tag, index) => (
                          <Chip key={index} label={tag} size="small" />
                        ))}
                      </Box>
                    )}
                    
                    <Button 
                      component={Link} 
                      to={`/posts`} 
                      size="small" 
                      sx={{ color: '#61082b' }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                  
                  {post.image && (
                    <CardMedia
                      component="img"
                      sx={{ width: 150, display: { xs: 'none', sm: 'block' } }}
                      image={post.image}
                      alt="Post image"
                    />
                  )}
                </StyledCard>
              </Grid>
            ))}
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/posts" 
                  sx={{ color: '#61082b', borderColor: '#61082b' }}
                >
                  View All Posts
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        
        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* People You May Know */}
          <StyledPaper sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GroupIcon sx={{ mr: 1, color: '#61082b' }} />
              <Typography variant="h6">People You May Know</Typography>
            </Box>
            
            <List>
              {recommendedUsers.map(user => (
                <React.Fragment key={user.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar src={user.avatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {user.role} at {user.company}
                          </Typography>
                          <br />
                          {user.skills.slice(0, 2).join(', ')}
                        </>
                      }
                    />
                    <Button 
                      variant="outlined" 
                      size="small" 
                      sx={{ 
                        minWidth: 'auto', 
                        px: 2,
                        color: '#61082b',
                        borderColor: '#61082b',
                      }}
                    >
                      Connect
                    </Button>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <Button 
                component={Link} 
                to="/posts" 
                sx={{ color: '#61082b' }}
              >
                See More
              </Button>
            </Box>
          </StyledPaper>
          
          {/* Popular Chat Groups */}
          <StyledPaper sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GroupIcon sx={{ mr: 1, color: '#61082b' }} />
              <Typography variant="h6">Popular Chat Groups</Typography>
            </Box>
            
            <List>
              {popularChatGroups.map(group => (
                <ListItem key={group.id} sx={{ px: 0 }}>
                  <ListItemAvatar>
                    <Avatar src={group.image} variant="rounded" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={group.name}
                    secondary={`${group.members} members`}
                  />
                  <Button 
                    component={Link} 
                    to={`/chats/${group.id}`}
                    variant="contained" 
                    size="small"
                    sx={{ 
                      backgroundColor: '#61082b',
                      '&:hover': {
                        backgroundColor: '#484b50',
                      }
                    }}
                  >
                    Join
                  </Button>
                </ListItem>
              ))}
            </List>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <Button 
                component={Link} 
                to="/chats" 
                sx={{ color: '#61082b' }}
              >
                See All Groups
              </Button>
            </Box>
          </StyledPaper>
          
          {/* Upcoming Events */}
          <StyledPaper>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EventIcon sx={{ mr: 1, color: '#61082b' }} />
              <Typography variant="h6">Upcoming Events</Typography>
            </Box>
            
            <List>
              {upcomingEvents.map(event => (
                <ListItem key={event.id} sx={{ px: 0 }}>
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">
                          {event.date}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.secondary">
                          {event.location}
                        </Typography>
                      </>
                    }
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      color: '#61082b',
                      borderColor: '#61082b',
                    }}
                  >
                    RSVP
                  </Button>
                </ListItem>
              ))}
            </List>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 