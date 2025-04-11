# Educational Blog Platform

A modern educational blog platform with user authentication, blog creation, and interactive features.

## Deployment Instructions

### Backend Deployment (Render)

1. Create a new account on [Render](https://render.com/) if you don't have one
2. Click on "New" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: `edublog-api`
   - Root Directory: `educational-blog/backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables (from `.env.production`):
   - `PORT`: 8080
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your JWT secret key
   - `JWT_EXPIRE`: 30d
   - `NODE_ENV`: production
6. Click "Create Web Service"

### Frontend Deployment (Netlify)

1. Create a new account on [Netlify](https://netlify.com/) if you don't have one
2. Click on "New site from Git"
3. Connect your GitHub repository
4. Configure the build settings:
   - Base directory: `educational-blog`
   - Build command: `npm run build`
   - Publish directory: `build`
5. Add environment variables:
   - `REACT_APP_API_URL`: Your Render backend URL (e.g., `https://edublog-api.onrender.com/api`)
   - `REACT_APP_USE_MOCK_DATA`: false
6. Click "Deploy site"

## Local Development

### Backend Setup

```bash
cd educational-blog/backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd educational-blog
npm install
npm start
```

## Features

- User authentication and authorization
- Blog creation, editing, and deletion
- Comments and likes
- User profiles with login history
- MongoDB database integration
- Responsive design

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API requests
- Framer Motion for animations
- React Icons
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd educational-blog
```

2. Set up backend:
```
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
JWT_EXPIRE=30d
```

4. Set up frontend:
```
cd ../
npm install
```

5. Start the application:

In one terminal for the backend:
```
cd backend
npm run dev
```

In another terminal for the frontend:
```
npm start
```

## Usage

1. Register or log in to access the full functionality
2. Browse blogs by categories or use the search function
3. Create your own educational blogs
4. Like and comment on others' blogs
5. Manage your blogs from the dashboard

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get a single blog
- `POST /api/blogs` - Create a blog
- `PUT /api/blogs/:id` - Update a blog
- `DELETE /api/blogs/:id` - Delete a blog
- `POST /api/blogs/:id/comments` - Add a comment to a blog
- `PUT /api/blogs/:id/like` - Like/unlike a blog

### Users
- `GET /api/users/:id` - Get user profile
- `GET /api/users/:id/blogs` - Get user's blogs
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/updatepassword` - Update password

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) 