jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import React from 'react';
import { useRouter } from 'next/router';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Star from '@/components/Star';

describe('Star component', () => {
  it('renders with the correct class based on isLit prop', () => {
    const { container } = render(<Star isLit={true} n={0} postId={"null"} postsLength={0} />);
    expect(container.firstChild).toHaveClass('isLit');
    expect(container.firstChild).not.toHaveClass('isNotLit');
  });

  it('calls handleStarClick2 when button is clicked', async () => {
    // NOT WORKING
    const mockFetch = jest.fn(() => Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ data: 'mock data' })
    }));
    (global as any).fetch = mockFetch;
  
    const push = jest.fn();
    // useRouter.mockImplementation(() => ({ push }));
    (jest.fn() as jest.Mock).mockImplementation(() => ({ push }));

    render(<Star isLit={true} n={0} postId={"postId"} postsLength={0} />);
    fireEvent.click(screen.getByRole('button'));

    expect(mockFetch).toHaveBeenCalledWith('/api/appendToFile', expect.anything());
    await waitFor(() => expect(push).toHaveBeenCalledWith('/StarPage'));
  });



  it('renders AiFillStar when isLit is true', () => {
    render(<Star isLit={true} n={0} postId={"null"} postsLength={0} />);
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
  });

  it('renders AiOutlineStar when isLit is false', () => {
      render(<Star isLit={false} n={0} postId={"null"} postsLength={0} />);
      expect(screen.getByTestId('star-outline-icon')).toBeInTheDocument();
  });
});