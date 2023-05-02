import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

type NavbarProps = {
  isLoggedIn: boolean;
};

export default function Navbar({ isLoggedIn }: NavbarProps) {
  return (
    <nav className={cn(`flex flex-row items-center justify-between flex-wrap p-6`)}>
      <div className={cn(`left flex flex-row`)}>
        <Link className={cn(`text-2xl font-bold text-gray-800 mr-[60px]`)} href="/">
          100 REJECTIONS
        </Link>
        <div className={cn(`options flex flex-row justify-between w-[250px] items-center`)}>
          <Link className={cn('text-gray-600 hover:text-gray-800 px3 py2')} href="/about">
            About
          </Link>
          <Link className={cn('text-gray-600 hover:text-gray-800 px3 py2')} href="/resources">
            Resources
          </Link>
          <Link className={cn('text-gray-600 hover:text-gray-800 px3 py2 ')} href="/UserPage">
            User
          </Link>
        </div>
      </div>
      <div className={cn('right')}>
        {!isLoggedIn ? (
          <button className={cn('text-gray-600 hover:text-gray-800 px3 py2')}>
            Profile
          </button>
        ) : (
          <div className={cn(`flex flex-row justify-between w-[200px]`)}>
            <Link className={cn('text-gray-600 hover:text-gray-800 px3 py2')} href="/login">
              Login
            </Link>
            <Link className={cn('text-gray-600 hover:text-gray-800 px3 py2')} href="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
