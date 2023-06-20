import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import usersToPosts from '@/utils/usersToPosts';

import { User, Post } from '../../../types/types';

const users: User[] = [
  {
      profilePic: '',
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      posts: [
          { postId: '1', companyName: '', desc: '', date: '', time: '', timeInSeconds: 3, userId: '' },
          { postId: '2', companyName: '', desc: '', date: '', time: '', timeInSeconds: 1, userId: '' }
      ]
  },
  {
      profilePic: '',
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      posts: [
          { postId: '3', companyName: '', desc: '', date: '', time: '', timeInSeconds: 2, userId: '' }
      ]
  }
];

describe('usersToPosts', () => {
  it('returns an array of the expected length', () => {
      const posts = usersToPosts(users);
      expect(posts).toHaveLength(3);
  });

  it('returns posts with the expected properties', () => {
      const posts = usersToPosts(users);
      expect(posts[0]).toHaveProperty('postId', '2');
      expect(posts[1]).toHaveProperty('postId', '3');
      expect(posts[2]).toHaveProperty('postId', '1');
  });

  it('returns posts sorted by timeInSeconds', () => {
      const posts = usersToPosts(users);
      expect(posts[0]).toHaveProperty('timeInSeconds', 1);
      expect(posts[1]).toHaveProperty('timeInSeconds', 2);
      expect(posts[2]).toHaveProperty('timeInSeconds', 3);
  });
});
