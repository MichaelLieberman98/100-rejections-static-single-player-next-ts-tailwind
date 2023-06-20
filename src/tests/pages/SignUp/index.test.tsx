jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpPage from '@/pages/SignUp';

describe('SignUp page', () => {
  it('Should render properly', () => {
    render(<SignUpPage />);
    expect(screen.getByRole("heading", { name: "Sign Up" })).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Re-enter Password:")).toBeInTheDocument();
  });

  it('Should show "Passwords don\'t match" message when passwords don\'t match', async () => {
    // const mockFetch = jest.fn();
    // (global as any).fetch = mockFetch;
    // mockFetch.mockResolvedValueOnce({ ok: true });

    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "password1" } });
    fireEvent.change(screen.getByLabelText("Re-enter Password:"), { target: { value: "password2" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
    expect(await screen.findByText("Passwords don't match")).toBeInTheDocument();
  });

  it('Should show "Some info is repeated from another user" message when email already exists', async () => {
    const mockFetch = jest.fn();
    (global as any).fetch = mockFetch;
    mockFetch.mockResolvedValueOnce({ ok: false });

    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText("Email:"), { target: { value: "existing-email@example.com" } });
    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "password" } });
    fireEvent.change(screen.getByLabelText("Re-enter Password:"), { target: { value: "password" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));
    expect(await screen.findByText("Some info is repeated from another user")).toBeInTheDocument();
  });
});