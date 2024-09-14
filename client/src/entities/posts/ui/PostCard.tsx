import React from 'react';
import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

type PostCardProps = {
  post: {
    caption: string;
    comments: number;
    date: string;
    id: string;
    likes: number;
    permaLink: string;
    userId: string;
  };
  users: {
    id: string;
    username: string;
    postId: string;
  };
  postId: string;
  settings: {
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
};

const PostCard = ({ post, users, settings }: PostCardProps) => {
  const findAuthorByPostId = (
    authors: PostCardProps['users'],
    postId: PostCardProps['postId']
  ) => {
    const author = authors.find((author) => author.postId === postId);
    return author ? author.username : null;
  };

  const formatDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    const now = new Date();
    const daysDifference = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference < 7) {
      return formatDistanceToNow(date, { addSuffix: true, locale: ru });
    } else {
      return format(date, 'dd/MM/yyyy');
    }
  };

  const layoutStyles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: `repeat(${settings.layout.params.grid.columns}, 1fr)`,
      gap: '1rem',
    },
    masonry: {
      display: 'grid',
      gridTemplateColumns: `repeat(${settings.layout.params.masonry.columns}, 1fr)`,
      gap: '1rem',
      gridAutoFlow: 'dense',
    },
  };

  return (
    <div
      className='post-card'
      style={{
        width: '100%',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        border: '1px solid #ddd',
        ...(settings.layout.current === 'grid'
          ? layoutStyles.grid
          : layoutStyles.masonry),
      }}
    >
      <div
        className='card-body'
        style={{
          padding: '1rem',
          backgroundColor: '#fff',
        }}
      >
        <h5
          className='card-title'
          style={{
            margin: '0 0 0.5rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          {post.caption}
        </h5>
        <p
          className='card-text'
          style={{
            margin: '0 0 1rem',
            color: '#666',
          }}
        >
          {formatDate(post.date)}
        </p>
      </div>
      <ul
        className='list-group'
        style={{
          listStyle: 'none',
          padding: '0',
          margin: '0',
          backgroundColor: '#f9f9f9',
          borderTop: '1px solid #ddd',
        }}
      >
        <li
          className='list-group-item'
          style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #ddd',
            color: '#555',
          }}
        >
          Likes: {post.likes}
        </li>
        <li
          className='list-group-item'
          style={{
            padding: '0.75rem 1rem',
            borderBottom: '1px solid #ddd',
            color: '#555',
          }}
        >
          Comments: {post.comments}
        </li>
        <li
          className='list-group-item'
          style={{
            padding: '0.75rem 1rem',
            color: '#555',
          }}
        >
          Author: {findAuthorByPostId(users, post.id)}
        </li>
      </ul>
      <div
        className='card-links'
        style={{
          padding: '1rem',
          borderTop: '1px solid #ddd',
          backgroundColor: '#fff',
          textAlign: 'center',
        }}
      >
        <a
          href='#'
          className='card-link'
          style={{
            textDecoration: 'none',
            color: '#007bff',
            marginRight: '1rem',
          }}
        >
          Edit
        </a>
        <a
          href='#'
          className='card-link'
          style={{
            textDecoration: 'none',
            color: '#007bff',
          }}
        >
          Delete
        </a>
      </div>
    </div>
  );
};

export default PostCard;
