import React, { useEffect, useState } from 'react';
import PostCard from '@/entities/posts/ui/PostCard';
import './styles/index.css';

type Post = {
  caption: string;
  comments: number;
  date: string;
  id: string;
  likes: number;
  permaLink: string;
  userId: string;
};

type User = {
  id: string;
  username: string;
  postId: string;
};

type Settings = {
  layout: {
    current: string;
    params: {
      grid: {
        columns: number;
        rows: number;
      };
      masonry: {
        columns: number;
        rows: number;
      };
    };
  };
  template: string;
  navigation: 'load-more' | 'pagination';
};

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [settings, setSettings] = useState<Settings>();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('http://localhost:4000/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    async function fetchUsers() {
      try {
        const res = await fetch('http://localhost:4000/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    }

    async function fetchSettings() {
      try {
        const res = await fetch('http://localhost:4000/settings');
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        console.log('Error fetching settings:', error);
      }
    }

    fetchPosts();
    fetchUsers();
    fetchSettings();
  }, []);

  const updateSettings = async () => {
    try {
      const res = await fetch('http://localhost:4000/settings');
      const data = await res.json();
      setSettings(data);
    } catch (error) {
      console.log('Error updating settings:', error);
    }
  };

  const layoutStyles = settings
    ? settings.layout.current === 'grid'
      ? {
          display: 'grid',
          gridTemplateColumns: `repeat(${settings.layout.params.grid.columns}, 1fr)`,
          gap: '1rem',
        }
      : {
          display: 'grid',
          gridTemplateColumns: `repeat(${settings.layout.params.masonry.columns}, 1fr)`,
          gap: '1rem',
          gridAutoFlow: 'dense',
        }
    : {};

  return (
    <>
      <h1>Test task for Mirror</h1>
      <button onClick={updateSettings}>Update Settings</button>
      <div style={layoutStyles}>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            users={users}
            settings={settings}
          />
        ))}
      </div>
    </>
  );
}

export default App;
