import { faker } from '@faker-js/faker';

// Generate mock users
export const generateUsers = (count = 20) => {
  const users = [];
  
  // Define funding series options
  const fundingSeries = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D+', 'Bootstrapped', 'Not specified'];
  
  // Define industries
  const industries = [
    'Software & Tech', 
    'Fintech', 
    'Healthcare', 
    'E-commerce', 
    'Education', 
    'AI & Machine Learning', 
    'Clean Energy', 
    'Crypto & Blockchain', 
    'Consumer Goods', 
    'B2B Services'
  ];
  
  // Define company sizes
  const companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
  
  // Additional filter data
  const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55+'];
  const genders = ['Male', 'Female', 'Non-binary', 'Other'];
  const ethnicities = ['Asian', 'Black', 'Hispanic', 'White', 'Other'];
  const educationLevels = ['High School', 'Bachelor', 'Master', 'PhD'];
  const interests = ['Networking', 'Funding', 'Partnerships', 'Mentorship', 'Innovation', 'Growth', 'Marketing'];
  
  for (let i = 0; i < count; i++) {
    const isFounder = faker.datatype.boolean(0.6); // 60% chance of being a founder
    const role = isFounder 
      ? faker.helpers.arrayElement(['Founder', 'Co-Founder', 'CEO', 'CTO']) 
      : faker.helpers.arrayElement(['Investor', 'Product Manager', 'Designer', 'Developer', 'Marketing Director']);
    
    // Generate random interests (1-3)
    const userInterests = faker.helpers.arrayElements(
      interests, 
      faker.number.int({ min: 1, max: 3 })
    );
    
    users.push({
      id: i + 1,
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      company: faker.company.name(),
      role,
      bio: faker.lorem.paragraph(),
      location: `${faker.location.city()}, ${faker.location.country()}`,
      website: faker.internet.url(),
      joinDate: faker.date.past(),
      followers: faker.number.int({ min: 0, max: 5000 }),
      following: faker.number.int({ min: 0, max: 1000 }),
      isFounder,
      foundingDate: isFounder ? faker.date.past({ years: 10 }) : null,
      fundingSeries: isFounder ? faker.helpers.arrayElement(fundingSeries) : null,
      industry: faker.helpers.arrayElement(industries),
      companySize: isFounder ? faker.helpers.arrayElement(companySizes) : null,
      lookingFor: isFounder 
        ? faker.helpers.arrayElements(['Funding', 'Co-founder', 'Mentorship', 'Partnerships', 'Talent', 'Customers'], { min: 1, max: 3 }) 
        : null,
      skills: Array(faker.number.int({ min: 2, max: 6 }))
        .fill()
        .map(() => faker.helpers.arrayElement([
          'React', 'JavaScript', 'Business Strategy', 'Marketing', 'Finance', 
          'UX Design', 'Product Management', 'Leadership', 'Sales', 'Networking'
        ])),
      // New fields for filters
      age: faker.helpers.arrayElement(ageRanges),
      gender: faker.helpers.arrayElement(genders),
      ethnicity: faker.helpers.arrayElement(ethnicities),
      education: faker.helpers.arrayElement(educationLevels),
      interests: userInterests,
    });
  }
  return users;
};

// Generate mock posts
export const generatePosts = (count = 30) => {
  const users = generateUsers();
  const posts = [];
  
  for (let i = 0; i < count; i++) {
    const author = faker.helpers.arrayElement(users);
    posts.push({
      id: i + 1,
      author,
      content: faker.lorem.paragraph(faker.number.int({ min: 1, max: 4 })),
      image: faker.number.int({ min: 0, max: 3 }) > 1 ? faker.image.url() : null,
      likes: faker.number.int({ min: 0, max: 200 }),
      comments: faker.number.int({ min: 0, max: 50 }),
      shares: faker.number.int({ min: 0, max: 30 }),
      tags: Array(faker.number.int({ min: 0, max: 3 }))
        .fill()
        .map(() => faker.helpers.arrayElement([
          'Startups', 'Funding', 'Tech', 'Marketing', 'Success', 
          'Product', 'Innovation', 'Growth', 'Networking', 'AI'
        ])),
      timestamp: faker.date.recent({ days: 30 }),
    });
  }
  
  return posts.sort((a, b) => b.timestamp - a.timestamp);
};

// Generate chat groups
export const generateChatGroups = () => {
  const categories = [
    'Tech Startups',
    'Funding & Investment',
    'Marketing Strategies', 
    'Product Development',
    'Networking Events',
    'Leadership & Management',
    'Design Thinking',
    'Remote Work',
    'E-commerce',
    'Fintech Innovations',
    'AI & Machine Learning',
    'Blockchain & Crypto',
  ];
  
  return categories.map((name, index) => ({
    id: index + 1,
    name,
    description: faker.lorem.sentence(),
    members: faker.number.int({ min: 5, max: 200 }),
    image: `https://source.unsplash.com/random/200x200?${name.toLowerCase().replace(/[& ]/g, '-')}`,
    messages: Array(faker.number.int({ min: 10, max: 50 }))
      .fill()
      .map((_, i) => {
        const user = generateUsers(1)[0];
        return {
          id: i + 1,
          user,
          content: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
          timestamp: faker.date.recent({ days: 7 }),
        };
      })
      .sort((a, b) => a.timestamp - b.timestamp),
  }));
};

// Get unique locations from users (for filter options)
export const getLocations = (users) => {
  const locations = users.map(user => user.location.split(', ')[1]); // Get countries
  return [...new Set(locations)].sort();
};

// Get unique industries from users (for filter options)
export const getIndustries = (users) => {
  const industries = users.map(user => user.industry);
  return [...new Set(industries)].sort();
};

// Define funding series options (for filter options)
export const fundingSeriesOptions = [
  'Pre-seed', 
  'Seed', 
  'Series A', 
  'Series B', 
  'Series C', 
  'Series D+', 
  'Bootstrapped', 
  'Not specified'
];

// Initial mock data
export const users = generateUsers(40); // Generate more users for better filtering
export const currentUser = users[0];
export const posts = generatePosts();
export const chatGroups = generateChatGroups();

// Filter options derived from users
export const locations = getLocations(users);
export const industries = getIndustries(users); 