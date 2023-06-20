import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import generateData from '@/utils/generateData';

import { User, Post } from '../../../types/types';

const users = generateData(5, 1, 3);

describe('generateData function', () => {
  it('returns an array of the expected length', () => {
    expect(users).toHaveLength(5);
  });

  it('returns users with the expected properties', () => {
    users.forEach((user: User) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('firstName');
        expect(user).toHaveProperty('lastName');
        expect(user).toHaveProperty('password');
    });
  });

  it('returns users with the expected number of posts', () => {
    users.forEach(user => {
        expect(user.posts.length).toBeGreaterThanOrEqual(1);
        expect(user.posts.length).toBeLessThanOrEqual(3);
    });
  });
});