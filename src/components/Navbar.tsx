import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

type NavbarProps = {
  isLoggedIn: boolean;
};

export default function Navbar({ isLoggedIn }: NavbarProps) {
  console.log(isLoggedIn);
  return (
    <nav className={cn(`flex flex-row items-center justify-between flex-wrap p-6`)}>
      <div className={cn(`left flex flex-row justify-between`)}>
        <Link className={cn(`text-2xl font-bold text-gray-800 sm:mr-[0px] lg:mr-[60px]`)} href="/">
          100 REJECTIONS
        </Link>
        <div className={cn(`options flex flex-row justify-between w-[150px] items-center sm:hidden lg:flex`)}>
          <Link className={cn('text-gray-600 hover:text-gray-800 px3 py2')} href="/About">
            About
          </Link>
          <Link className={cn(`text-gray-600 hover:text-gray-800 px3 py2 `)} href="/HowItWorks">
            How it works
          </Link>
        </div>
      </div>
      <div className={cn(`right`)}>
        <div className={cn(`sm:hidden lg:flex`)}>
          {!isLoggedIn ? (
            <Link className={cn(`text-gray-600 hover:text-gray-800 px3 py2`)} href="/UserPage">
              Profile
            </Link>
          ) : (
            <div className={cn(`flex flex-row justify-between w-[200px]`)}>
              <Link className={cn(`text-gray-600 hover:text-gray-800 px3 py2`)} href="/login">
                Login
              </Link>
              <Link className={cn(`text-gray-600 hover:text-gray-800 px3 py2`)} href="/signup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
        
      </div>
      <div className={cn(`hidden`)}>

      </div>
    </nav>
  );
}
