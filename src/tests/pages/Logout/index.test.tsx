jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LogoutPage from '@/pages/Logout';

describe('Logout page', () => {
  it('Should render properly', () => {
    const mockFetch = jest.fn();
    (global as any).fetch = mockFetch;
    mockFetch.mockResolvedValueOnce({ ok: false });
    
    render(<LogoutPage />);
    expect(screen.getByText("Logging you out, please wait...")).toBeInTheDocument();
  });
});
