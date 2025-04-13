# Tethered

A professional platform for entrepreneurs to connect, share ideas, and grow their network.

## Features

- **Profile Page**: Create and manage your professional profile
- **Posts**: Share thoughts, ideas, and insights with the community
- **Group Chats**: Join category-specific discussions with like-minded entrepreneurs

## Technology Stack

- React.js
- Material UI
- React Router
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/tethered.git
```

2. Navigate to the project directory
```
cd tethered
```

3. Install the dependencies
```
npm install
```

4. Start the development server
```
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Application Structure

- `/src/components`: Reusable UI components
- `/src/pages`: Main application pages
- `/src/context`: State management using Context API
- `/src/data`: Mock data to simulate backend functionality

## Available Pages

- **Home** (`/`): Dashboard with trending topics, latest posts, and recommended connections
- **Posts** (`/posts`): View and create posts, filter by different categories
- **Profile** (`/profile`): View and manage your professional profile
- **Chats** (`/chats`): Join and participate in group discussions

## State Management

The application uses React's Context API for state management. The main contexts are:

- `AppContext`: Manages global app state including user data, posts, and chats

## Mock Backend

Since this is a frontend-only MVP, we use mock data to simulate backend functionality. In a production environment, these would be replaced with actual API calls.

## Future Enhancements

- Authentication system
- Real-time messaging with WebSockets
- Advanced search and filtering
- Notifications system
- Mobile application

## License

This project is licensed under the MIT License.

## Acknowledgments

- Material UI for the component library
- React Router for navigation
- Faker.js for generating mock data
