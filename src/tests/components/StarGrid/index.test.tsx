jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import React from 'react';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StarGrid from '@/components/StarGrid';

import { Post } from '../../../types/types';

describe('StarGrid component', () => {
  it('Should render the expected number of Star components', () => {
    const posts: Post[] = [
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
    const { container } = render(<StarGrid posts={posts} />);
    expect(screen.getAllByTestId("star").length).toBe(100);
    expect(container.getElementsByClassName("isLit").length).toBe(posts.length);
    expect(container.getElementsByClassName("isNotLit").length).toBe(100 - posts.length);
  });
});
