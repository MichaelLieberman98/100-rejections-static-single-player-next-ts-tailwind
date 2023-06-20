jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import UserPage from '@/pages/UserPage';
import { getServerSideProps } from '@/pages/UserPage';

import { User, Post } from '../../../types/types';

describe('UserPage', () => {
  it('Should render properly', () => {
    // const mockFetch = jest.fn();
    // (global as any).fetch = mockFetch;
    // mockFetch.mockResolvedValueOnce({ ok: false });
    const user: User = {
      profilePic: "https://avatars.githubusercontent.com/u/94511880",
      id: "T02ndCiB",
      email: "Curt.Kuvalis@gmail.com",
      firstName: "Curt",
      lastName: "Kuvalis",
      password: "JcGYsCa6YvNstxR",
      posts: [
        {
          postId: "kaur4xNO",
          companyName: "Bogan, Wuckert and Doyle",
          desc: "Atque exercitationem voluptatem commodi dolores cumque explicabo tempora nobis.",
          date: "2/21/2023",
          time: "13:47 PM",
          timeInSeconds: 730294128,
          userId: "T02ndCiB"
        },
        {
          postId: "0MQpkiiY",
          companyName: "Reilly, Wiza and Kunde",
          desc: "Modi quaerat esse amet excepturi in magni incidunt nulla.",
          date: "1/31/2023",
          time: "13:22 PM",
          timeInSeconds: 728432614,
          userId: "T02ndCiB"
        }
      ]
    };
    render(<UserPage user={user} />);
    expect(screen.getByText(`${user.firstName} ${user.lastName}`)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Pic" })).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    // expect(screen.getByTestId("star-grid")).toBeInTheDocument();
  });

  it('Should return the expected props from getServerSideProps', async () => {
    // const context = {}; // You can pass any necessary context here
    const result = await getServerSideProps();
    expect(result.props.user).toBeDefined();
    // Add more assertions to check if the returned props are correct

  });
});