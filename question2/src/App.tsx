import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Avatar, 
  CircularProgress,
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import axios from 'axios';

interface User {
  userId: string;
  name: string;
  totalComments: number;
  postCount: number;
}

interface Post {
  postId: string;
  userId: string;
  content: string;
  commentCount: number;
  createdAt: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const usersResponse = await axios.get('http://localhost:3000/users');
      setTopUsers(usersResponse.data);

      const trendingResponse = await axios.get('http://localhost:3000/posts?type=popular');
      setTrendingPosts(trendingResponse.data);

      const latestResponse = await axios.get('http://localhost:3000/posts?type=latest');
      setLatestPosts(latestResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Set up polling for real-time updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const getRandomAvatarColor = (id: string) => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50'];
    return colors[parseInt(id) % colors.length];
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Social Media Analytics
        </Typography>

        <Paper sx={{ width: '100%', mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Top Users" />
            <Tab label="Trending Posts" />
            <Tab label="Feed" />
          </Tabs>
        </Paper>

        {activeTab === 0 && (
          <Grid container spacing={3}>
            {topUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.userId}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar 
                        sx={{ 
                          bgcolor: getRandomAvatarColor(user.userId),
                          width: 56, 
                          height: 56,
                          mr: 2
                        }}
                      >
                        {user.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6">{user.name}</Typography>
                        <Typography color="textSecondary">User ID: {user.userId}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      Posts: {user.postCount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Comments: {user.totalComments}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 1 && (
          <Grid container spacing={3}>
            {trendingPosts.map((post) => (
              <Grid item xs={12} key={post.postId}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar 
                        sx={{ 
                          bgcolor: getRandomAvatarColor(post.userId),
                          width: 40, 
                          height: 40,
                          mr: 2
                        }}
                      >
                        {post.userId.charAt(0)}
                      </Avatar>
                      <Typography variant="subtitle1">User {post.userId}</Typography>
                    </Box>
                    <Typography variant="body1" paragraph>
                      {post.content}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Comments: {post.commentCount}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {activeTab === 2 && (
          <Grid container spacing={3}>
            {latestPosts.map((post) => (
              <Grid item xs={12} key={post.postId}>
                <Card>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar 
                        sx={{ 
                          bgcolor: getRandomAvatarColor(post.userId),
                          width: 40, 
                          height: 40,
                          mr: 2
                        }}
                      >
                        {post.userId.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">User {post.userId}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {new Date(post.createdAt).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" paragraph>
                      {post.content}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Comments: {post.commentCount}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default App; 