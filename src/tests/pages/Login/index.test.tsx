jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from '@/pages/Login';

describe('Login page', () => {
  it('Should render properly', () => {
    render(<LoginPage />);
    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
  });
});
