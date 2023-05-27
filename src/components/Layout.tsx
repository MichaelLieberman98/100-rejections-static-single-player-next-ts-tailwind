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
  // console.log(currentUser.id !== "");
  return (
    <>
      <Navbar isLoggedIn={currentUser.id !== ""}/>
      <main>{children}</main>
    </>
  )
};