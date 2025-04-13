import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Card,
  CardContent,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useApp } from '../context/AppContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 10,
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
}));

const CoverImage = styled(Box)(({ theme }) => ({
  height: 200,
  width: '100%',
  backgroundColor: '#61082b',
  borderRadius: '10px 10px 0 0',
  position: 'relative',
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: '5px solid white',
  position: 'absolute',
  bottom: -75,
  left: 20,
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: '#61082b',
  display: 'flex',
  alignItems: 'center',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: 'rgba(46, 59, 85, 0.1)',
  color: '#61082b',
}));

const Profile = () => {
  const { userId } = useParams();
  const { user: currentUser, allUsers, allPosts, updateProfile } = useApp();
  
  // State for profile being viewed
  const [profileUser, setProfileUser] = useState(currentUser);
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  
  // State for UI
  const [activeTab, setActiveTab] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...currentUser });
  
  // Load profile based on URL param
  useEffect(() => {
    if (userId) {
      const foundUser = allUsers.find(u => u.id === parseInt(userId));
      if (foundUser) {
        setProfileUser(foundUser);
        setIsOwnProfile(foundUser.id === currentUser.id);
      } else {
        // Handle user not found - could redirect or show error
        setProfileUser(currentUser);
        setIsOwnProfile(true);
      }
    } else {
      setProfileUser(currentUser);
      setIsOwnProfile(true);
    }
  }, [userId, allUsers, currentUser]);
  
  // Get user's posts
  const userPosts = allPosts.filter(post => post.author.id === profileUser.id);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle edit dialog open
  const handleEditDialogOpen = () => {
    setEditedProfile({ ...profileUser });
    setOpenEditDialog(true);
  };
  
  // Handle edit dialog close
  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };
  
  // Handle profile update
  const handleProfileUpdate = () => {
    updateProfile(editedProfile);
    handleEditDialogClose();
  };
  
  // Handle profile field change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      {/* Profile Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 3, 
          overflow: 'hidden', 
          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)', 
          mb: 10 
        }}
      >
        <CoverImage />
        <ProfileAvatar src={profileUser.avatar} />
        
        <Box sx={{ position: 'relative', mt: 2, p: 3, pt: 8 }}>
          <Box sx={{ position: 'absolute', top: 10, right: 20 }}>
            {isOwnProfile ? (
              <Button 
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEditDialogOpen}
                sx={{ 
                  borderColor: '#61082b',
                  color: '#61082b',
                  '&:hover': {
                    borderColor: '#484b50',
                    backgroundColor: 'rgba(46, 59, 85, 0.05)',
                  }
                }}
              >
                Edit Profile
              </Button>
            ) : (
              <Button 
                variant="contained"
                sx={{ 
                  backgroundColor: '#61082b',
                  '&:hover': {
                    backgroundColor: '#484b50',
                  }
                }}
              >
                Connect
              </Button>
            )}
          </Box>
          
          <Typography variant="h4" gutterBottom>
            {profileUser.name}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" gutterBottom>
            @{profileUser.username}
          </Typography>
          
          <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
            {profileUser.bio}
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box>
                <InfoItem>
                  <IconWrapper>
                    <BusinessIcon />
                  </IconWrapper>
                  <Typography variant="body2">
                    {profileUser.role} at {profileUser.company}
                  </Typography>
                </InfoItem>
                
                <InfoItem>
                  <IconWrapper>
                    <LocationOnIcon />
                  </IconWrapper>
                  <Typography variant="body2">
                    {profileUser.location}
                  </Typography>
                </InfoItem>
                
                <InfoItem>
                  <IconWrapper>
                    <EmailIcon />
                  </IconWrapper>
                  <Typography variant="body2">
                    {profileUser.email}
                  </Typography>
                </InfoItem>
                
                {profileUser.website && (
                  <InfoItem>
                    <IconWrapper>
                      <LanguageIcon />
                    </IconWrapper>
                    <Typography variant="body2">
                      <a 
                        href={profileUser.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#61082b', textDecoration: 'none' }}
                      >
                        {profileUser.website}
                      </a>
                    </Typography>
                  </InfoItem>
                )}
                
                <InfoItem>
                  <IconWrapper>
                    <CalendarTodayIcon />
                  </IconWrapper>
                  <Typography variant="body2">
                    Joined {formatDate(profileUser.joinDate)}
                  </Typography>
                </InfoItem>
                
                {profileUser.isFounder && profileUser.foundingDate && (
                  <InfoItem>
                    <IconWrapper>
                      <BusinessIcon />
                    </IconWrapper>
                    <Typography variant="body2">
                      Founded company in {new Date(profileUser.foundingDate).getFullYear()}
                      {profileUser.fundingSeries && ` • ${profileUser.fundingSeries}`}
                    </Typography>
                  </InfoItem>
                )}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{profileUser.followers}</Typography>
                  <Typography variant="body2" color="text.secondary">Followers</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{profileUser.following}</Typography>
                  <Typography variant="body2" color="text.secondary">Following</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">{userPosts.length}</Typography>
                  <Typography variant="body2" color="text.secondary">Posts</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {/* Profile Content */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={4}>
          {/* Skills */}
          <StyledPaper sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Skills & Expertise</Typography>
              {isOwnProfile && (
                <IconButton size="small" onClick={handleEditDialogOpen}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {profileUser.skills?.map((skill, index) => (
                <StyledChip key={index} label={skill} />
              ))}
            </Box>
          </StyledPaper>
          
          {/* Looking For */}
          {profileUser.isFounder && profileUser.lookingFor && profileUser.lookingFor.length > 0 && (
            <StyledPaper sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Looking For
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {profileUser.lookingFor.map((item, index) => (
                  <Chip
                    key={index}
                    label={item}
                    sx={{
                      backgroundColor: 'rgba(46, 59, 85, 0.1)',
                      color: '#61082b',
                    }}
                  />
                ))}
              </Box>
            </StyledPaper>
          )}
          
          {/* Connections Preview */}
          <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Connections</Typography>
              <Button 
                size="small" 
                sx={{ color: '#61082b' }}
              >
                See All
              </Button>
            </Box>
            
            <List>
              {/* Display a few connections (in a real app, these would come from the user's connections) */}
              {[1, 2, 3].map((item) => (
                <ListItem key={item} sx={{ px: 0 }}>
                  <Avatar sx={{ mr: 2 }} src={`https://randomuser.me/api/portraits/men/${item + 20}.jpg`} />
                  <ListItemText 
                    primary={`Connection ${item}`} 
                    secondary="Company Name" 
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      minWidth: 'auto', 
                      px: 1,
                      borderColor: '#61082b',
                      color: '#61082b',
                    }}
                  >
                    Message
                  </Button>
                </ListItem>
              ))}
            </List>
          </StyledPaper>
        </Grid>
        
        {/* Right Column */}
        <Grid item xs={12} md={8}>
          {/* Tabs */}
          <Box sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ 
                '& .MuiTab-root': { textTransform: 'none' },
                '& .Mui-selected': { color: '#61082b' },
                '& .MuiTabs-indicator': { backgroundColor: '#61082b' } 
              }}
            >
              <Tab label="Posts" />
              <Tab label="Activity" />
              <Tab label="About" />
            </Tabs>
          </Box>
          
          {/* Tab Panels */}
          <Box sx={{ mt: 2 }}>
            {activeTab === 0 && (
              <Box>
                {userPosts.length > 0 ? (
                  userPosts.map(post => (
                    <Card 
                      key={post.id} 
                      sx={{ 
                        mb: 3, 
                        borderRadius: 2,
                        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar src={profileUser.avatar} sx={{ mr: 2 }} />
                          <Box>
                            <Typography variant="subtitle1">{profileUser.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {new Date(post.timestamp).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Typography variant="body1" paragraph>
                          {post.content}
                        </Typography>
                        
                        {post.image && (
                          <Box sx={{ borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                            <img 
                              src={post.image} 
                              alt="Post attachment" 
                              style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} 
                            />
                          </Box>
                        )}
                        
                        {post.tags && post.tags.length > 0 && (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
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
                        
                        <Box sx={{ display: 'flex', mt: 2 }}>
                          <Button size="small" sx={{ color: '#61082b', mr: 1 }}>
                            {post.likes} Likes
                          </Button>
                          <Button size="small" sx={{ color: '#61082b', mr: 1 }}>
                            {post.comments} Comments
                          </Button>
                          <Button size="small" sx={{ color: '#61082b' }}>
                            {post.shares} Shares
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      {isOwnProfile ? "You haven't posted anything yet." : "This user hasn't posted anything yet."}
                    </Typography>
                    {isOwnProfile && (
                      <Button 
                        variant="contained"
                        sx={{ 
                          mt: 2,
                          backgroundColor: '#61082b',
                          '&:hover': {
                            backgroundColor: '#484b50',
                          } 
                        }}
                      >
                        Create Your First Post
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            )}
            
            {activeTab === 1 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  Recent activity will appear here
                </Typography>
              </Box>
            )}
            
            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>About</Typography>
                <Typography variant="body1" paragraph>
                  {profileUser.bio}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>Experience</Typography>
                <Card sx={{ mb: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1">{profileUser.role}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {profileUser.company}
                    </Typography>
                    <Typography variant="body2">
                      {profileUser.isFounder 
                        ? `Founder and ${profileUser.role} at ${profileUser.company}. ${profileUser.industry} company focused on innovative solutions.`
                        : `Experienced ${profileUser.role} with expertise in ${profileUser.industry} businesses.`}
                    </Typography>
                  </CardContent>
                </Card>
                
                {profileUser.isFounder && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" gutterBottom>Company Details</Typography>
                    <Card sx={{ mb: 3, borderRadius: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1">{profileUser.company}</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {profileUser.industry} • {profileUser.companySize || 'Small team'}
                        </Typography>
                        <Typography variant="body2">
                          Founded in {new Date(profileUser.foundingDate).getFullYear()} • {profileUser.fundingSeries}
                        </Typography>
                      </CardContent>
                    </Card>
                  </>
                )}
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>Education</Typography>
                <Card sx={{ mb: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1">University of Technology</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      MBA in Business Administration
                    </Typography>
                    <Typography variant="body2">
                      2010 - 2012
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      
      {/* Edit Profile Dialog */}
      {isOwnProfile && (
        <Dialog 
          open={openEditDialog} 
          onClose={handleEditDialogClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                name="name"
                value={editedProfile.name}
                onChange={handleProfileChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Role"
                name="role"
                value={editedProfile.role}
                onChange={handleProfileChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Company"
                name="company"
                value={editedProfile.company}
                onChange={handleProfileChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Location"
                name="location"
                value={editedProfile.location}
                onChange={handleProfileChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Website"
                name="website"
                value={editedProfile.website}
                onChange={handleProfileChange}
              />
              <TextField
                margin="normal"
                fullWidth
                multiline
                rows={4}
                label="Bio"
                name="bio"
                value={editedProfile.bio}
                onChange={handleProfileChange}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose}>Cancel</Button>
            <Button 
              onClick={handleProfileUpdate}
              variant="contained"
              sx={{ 
                backgroundColor: '#61082b',
                '&:hover': {
                  backgroundColor: '#484b50',
                } 
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default Profile; 