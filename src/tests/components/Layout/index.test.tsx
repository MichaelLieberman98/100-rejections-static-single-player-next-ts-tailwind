import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from '@/components/Layout';

describe('Layout component', () => {
  it('Should render properly', () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });
});