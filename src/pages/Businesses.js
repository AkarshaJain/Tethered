import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Pagination,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { fundingSeriesOptions, industries } from '../data/mockData';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 10,
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 10,
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.12)',
  },
}));

const LabeledInfo = styled(Box)(({ theme }) => ({
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

// Format date (MM/YYYY)
const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getFullYear()}`;
};

const Businesses = () => {
  const { allUsers } = useApp();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  // Get only businesses from all users (who are founders) and organize by company
  const businesses = useMemo(() => {
    const founderUsers = allUsers.filter(user => user.isFounder);
    
    // Group by company name to avoid duplicates
    const companyMap = new Map();
    
    founderUsers.forEach(user => {
      if (!companyMap.has(user.company)) {
        companyMap.set(user.company, {
          id: user.id,
          name: user.company,
          founder: user.name,
          founderId: user.id,
          industry: user.industry,
          fundingSeries: user.fundingSeries || 'Not specified',
          companySize: user.companySize || 'Unknown',
          location: user.location,
          website: user.website,
          foundingDate: user.foundingDate,
          lookingFor: user.lookingFor || [],
          logo: user.avatar, // Using founder's avatar as company logo for this example
        });
      }
    });
    
    return Array.from(companyMap.values());
  }, [allUsers]);
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [industry, setIndustry] = useState('');
  const [fundingSeries, setFundingSeries] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [showFilters, setShowFilters] = useState(!isMobile);
  
  // State for businesses
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);
  
  // Pagination
  const [page, setPage] = useState(1);
  const businessesPerPage = 6;
  
  // Effect to filter businesses when filters change
  useEffect(() => {
    let mounted = true;
    
    const applyFilters = () => {
      let results = [...businesses];
      
      // Apply search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(business => 
          business.name.toLowerCase().includes(query) ||
          business.founder.toLowerCase().includes(query) ||
          (business.industry && business.industry.toLowerCase().includes(query))
        );
      }
      
      // Apply industry filter
      if (industry) {
        results = results.filter(business => business.industry === industry);
      }
      
      // Apply funding series filter
      if (fundingSeries) {
        results = results.filter(business => business.fundingSeries === fundingSeries);
      }
      
      // Apply company size filter
      if (companySize) {
        results = results.filter(business => business.companySize === companySize);
      }
      
      if (mounted) {
        setFilteredBusinesses(results);
        setPage(1); // Reset to first page when filters change
      }
    };
    
    applyFilters();
    
    // Cleanup function
    return () => {
      mounted = false;
    };
  }, [businesses, searchQuery, industry, fundingSeries, companySize]);
  
  // Add a separate effect for DOM cleanup on unmount only
  useEffect(() => {
    return () => {
      document.body.classList.add('cleanup-in-progress');
      setTimeout(() => {
        document.body.classList.remove('cleanup-in-progress');
      }, 100);
    };
  }, []);
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredBusinesses.length / businessesPerPage);
  const currentBusinesses = filteredBusinesses.slice(
    (page - 1) * businessesPerPage,
    page * businessesPerPage
  );
  
  // Handler functions
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleClearFilters = () => {
    setSearchQuery('');
    setIndustry('');
    setFundingSeries('');
    setCompanySize('');
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleConnect = (founderId) => {
    console.log('Connecting with business owner:', founderId);
    // Future implementation
  };
  
  const handleViewProfile = (founderId) => {
    navigate(`/profile/${founderId}`);
  };
  
  // Company size options
  const companySizeOptions = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8, position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#61082b' }}>
        Discover Businesses
      </Typography>
      <Typography variant="body1" paragraph sx={{ mb: 4 }}>
        Find and connect with innovative businesses based on industry, funding stage, and size.
      </Typography>
      
      {/* Search and Filter Section */}
      <StyledPaper sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search by business name, founder, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchQuery ? (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setSearchQuery('')} 
                    edge="end"
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            sx={{ mb: { xs: 2, md: 0 }, mr: { md: 2 } }}
          />
          
          {isMobile && (
            <IconButton 
              onClick={toggleFilters} 
              sx={{ 
                ml: 1, 
                backgroundColor: '#61082b', 
                color: 'white',
                '&:hover': { backgroundColor: '#484b50' } 
              }}
            >
              <FilterListIcon />
            </IconButton>
          )}
        </Box>
        
        {showFilters && (
          <Grid container spacing={2}>
            {/* Industry Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small" sx={{ minWidth: '200px' }}>
                <InputLabel>Industry</InputLabel>
                <Select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  label="Industry"
                >
                  <MenuItem value="">All</MenuItem>
                  {industries.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Funding Stage Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small" sx={{ minWidth: '200px' }}>
                <InputLabel>Funding Stage</InputLabel>
                <Select
                  value={fundingSeries}
                  onChange={(e) => setFundingSeries(e.target.value)}
                  label="Funding Stage"
                >
                  <MenuItem value="">All</MenuItem>
                  {fundingSeriesOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Company Size Filter */}
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small" sx={{ minWidth: '200px' }}>
                <InputLabel>Number of Employees</InputLabel>
                <Select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  label="Number of Employees"
                >
                  <MenuItem value="">All</MenuItem>
                  {companySizeOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Clear Filters Button */}
            <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
              <Button 
                variant="outlined" 
                onClick={handleClearFilters}
                startIcon={<ClearIcon />}
                sx={{ 
                  borderColor: '#61082b', 
                  color: '#61082b',
                  '&:hover': {
                    borderColor: '#61082b',
                    backgroundColor: 'rgba(46, 59, 85, 0.05)',
                  },
                  minWidth: '200px'
                }}
                fullWidth
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        )}
      </StyledPaper>
      
      {/* Businesses Grid */}
      {currentBusinesses.length > 0 ? (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {currentBusinesses.map((business) => (
              <Grid item xs={12} sm={6} md={4} key={business.id}>
                <StyledCard>
                  {/* Card Header with Logo and Name */}
                  <Box sx={{ 
                    bgcolor: '#61082b', 
                    p: 2, 
                    color: 'white',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    position: 'relative'
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                      <Avatar
                        src={business.logo}
                        alt={business.name}
                        sx={{ width: 80, height: 80, border: '3px solid white', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
                      />
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ pt: 3, pb: 0, px: 3, flexGrow: 1 }}>
                    <Typography variant="h6" align="center" gutterBottom>
                      {business.name}
                    </Typography>
                    
                    <Typography 
                      variant="subtitle1" 
                      align="center" 
                      color="text.secondary"
                      gutterBottom
                    >
                      Founded by {business.founder}
                    </Typography>
                    
                    {/* Business Details */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 1.5,
                      justifyContent: 'center'
                    }}>
                      <Chip 
                        label={business.fundingSeries} 
                        size="small"
                        sx={{ 
                          mr: 1, 
                          backgroundColor: '#61082b',
                          color: 'white'
                        }} 
                      />
                      <Chip 
                        label={business.industry} 
                        size="small"
                        sx={{ backgroundColor: '#f0f0f0' }} 
                      />
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 1.5
                    }}>
                      <PeopleIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2">
                        {business.companySize} employees
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 1.5
                    }}>
                      <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2">
                        {business.location}
                      </Typography>
                    </Box>
                    
                    {business.foundingDate && (
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mb: 1.5
                      }}>
                        <BusinessIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2">
                          Founded {formatDate(business.foundingDate)}
                        </Typography>
                      </Box>
                    )}
                    
                    {business.website && (
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        mb: 1.5
                      }}>
                        <LinkIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                        <Typography 
                          variant="body2" 
                          component="a" 
                          href={business.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ color: '#61082b', textDecoration: 'none' }}
                        >
                          {business.website.replace(/^https?:\/\//i, '')}
                        </Typography>
                      </Box>
                    )}
                    
                    {/* Looking For Section */}
                    {business.lookingFor && business.lookingFor.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Looking for:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {business.lookingFor.map((item, index) => (
                            <Chip 
                              key={index} 
                              label={item} 
                              size="small"
                              sx={{ backgroundColor: '#e8f4fd' }} 
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                  
                  <CardActions sx={{ p: 2, justifyContent: 'center' }}>
                    <Button 
                      variant="contained"
                      onClick={() => handleConnect(business.founderId)}
                      sx={{ 
                        backgroundColor: '#61082b',
                        '&:hover': {
                          backgroundColor: '#3a4b6d',
                        }
                      }}
                    >
                      Connect
                    </Button>
                    <Button 
                      variant="outlined"
                      onClick={() => handleViewProfile(business.founderId)}
                      sx={{ 
                        borderColor: '#61082b', 
                        color: '#61082b',
                        '&:hover': {
                          borderColor: '#61082b',
                          backgroundColor: 'rgba(46, 59, 85, 0.05)',
                        }
                      }}
                    >
                      View Founder
                    </Button>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
              />
            </Box>
          )}
        </>
      ) : (
        <StyledPaper>
          <Alert 
            severity="info"
            action={
              <Button 
                color="inherit" 
                size="small" 
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            }
          >
            No businesses match your current filters. Try adjusting your search criteria.
          </Alert>
        </StyledPaper>
      )}
    </Container>
  );
};

export default Businesses; 