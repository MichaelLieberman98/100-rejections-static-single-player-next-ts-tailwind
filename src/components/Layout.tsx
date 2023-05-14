// src/component/Layout.tsx
import React from 'react';
import Link from 'next/link';

import Navbar from './Navbar';

import currentUser from '../data/currentUser.json';

type LayoutProps = {
  children: React.ReactNode;
}

// {isLoggedIn}: LayoutProps

export default function Layout({ children }: LayoutProps) {
  console.log(currentUser._id >= 0);
  return (
    <>
      <Navbar isLoggedIn={currentUser._id >= 0}/>
      <main>{children}</main>
    </>
  )
};