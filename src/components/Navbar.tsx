import React, { useState, useRef } from 'react';
import cn from 'classnames';
import Link from 'next/link';

import Hamburger from 'hamburger-react';

import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FaHome, FaQuoteLeft } from "react-icons/fa";
import { FaToolbox } from "react-icons/fa";
import { CgNotes, CgProfile } from "react-icons/cg";

import { gsap, Power3 } from 'gsap';

type NavbarProps = {
  isLoggedIn: boolean;
  'data-testid'?: string,
};

export default function Navbar({ isLoggedIn, 'data-testid': testId }: NavbarProps) {
  let [isOpen, setOpen] = useState(false);
  let menu: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  const moveMenuFunc = (duration: number) => {
    // console.log("move menu");
    // console.log(menu);
    if (!isOpen) {
      gsap.to(menu.current, {duration: duration, y: "320px" });
      // document.getElementById("menu").style.display = "none";
      // document.getElementById("ex").style.display = "block";
    } else {
      gsap.to(menu.current, { duration: duration, y: "-320px" });
      // document.getElementById("ex").style.display = "none";
      // document.getElementById("menu").style.display = "block";
    }
    setOpen(!isOpen);
  }

  // console.log(isLoggedIn);
  return (
    <nav data-testid={testId} className={cn(`flex flex-row items-center justify-between flex-wrap p-6 bg-[#0d0d0d]`)}>
      <div className={cn(`left flex flex-row justify-between`)}>
        <Link className={cn(`text-2xl font-bold text-white sm:mr-[0px] lg:mr-[40px]`)} href="/">
          100 REJECTIONS
        </Link>
        <div className={cn(`options flex flex-row justify-between w-[180px] items-center sm:hidden lg:flex`)}>
          <Link className={cn('text-white px3 py2')} href="/About">
            About
          </Link>
          <Link className={cn(`text-white px3 py2 `)} href="/HowItWorks">
            How it works
          </Link>
        </div>
      </div>
      <div className={cn(`right`)}>
        <div className={cn(`sm:hidden lg:flex`)}>
          {isLoggedIn ? (
            <div className={cn(`flex flex-row justify-between w-[150px]`)}>
              <Link className={cn(`text-white px3 py2`)} href="/UserPage">
                Profile
              </Link>
              <Link className={cn(`text-white px3 py2`)} href="/Logout">
                Logout
              </Link>
            </div>
          ) : (
            <div className={cn(`flex flex-row justify-between w-[150px]`)}>
              <Link className={cn(`text-white px3 py2`)} href="/Login">
                Login
              </Link>
              <Link className={cn(`text-white px3 py2`)} href="/SignUp">
                Sign Up
              </Link>
            </div>
          )}
        </div>
        
      </div>
      <div className={cn(`sm:flex lg:hidden`)}>
        <Hamburger toggled={isOpen} toggle={() => moveMenuFunc(0.4)} color={"#FF0000"}/>
      </div>

      <div className={cn(`absolute flex flex-col bg-[blue] top-[-200px] w-[80%] mx-auto p-[15px] left-0 right-0`)}
        ref={el => { menu.current = el }}>
        { !isLoggedIn ? (
          <div className={cn(`flex flex-row mb-[10px]`)}>
            <div className={cn(`flex`)}>
              <FaHome className={cn(`m-auto mr-[14px]`)}/>
            </div>
            <Link className={cn(`text-white`)} href="/SignUp" onClick={() => moveMenuFunc(0)}>
              Sign Up
            </Link>
          </div>
        ) : (
          <div className={cn(`flex flex-row mb-[10px]`)}>
            <div className={cn(`flex`)}>
              <CgProfile className={cn(`m-auto mr-[14px]`)}/>
            </div>
            <Link className={cn(`text-white`)} href="/UserPage" onClick={() => moveMenuFunc(0)}>
              Profile
            </Link>
          </div>
        )}

        { !isLoggedIn ? (
          <div className={cn(`flex flex-row mb-[10px]`)}>
            <div className={cn(`flex`)}>
              <BiLogIn className={cn(`m-auto mr-[14px] w-[20px`)}/>
            </div>
            <Link className={cn(`text-white`)} href="/Login" onClick={() => moveMenuFunc(0)}>
              Log In
            </Link>
          </div>
        ) : (
          <div className={cn(`flex flex-row mb-[10px]`)}>
            <div className={cn(`flex`)}>
              <BiLogOut className={cn(`m-auto mr-[14px] w-[20px`)}/>
            </div>
            <Link className={cn(`text-white`)} href="/Logout" onClick={() => moveMenuFunc(0)}>
              Log Out
            </Link>
          </div>
        )}
        
        <div className={cn(`flex flex-row mb-[10px]`)}>
          <div className={cn(`flex`)}>
            <FaQuoteLeft className={cn(`m-auto mr-[14px]`)}/>
          </div>
          <Link className={cn(`text-white`)} href="/About" onClick={() => moveMenuFunc(0)}>
            About
          </Link>
        </div>
        <div className={cn(`flex flex-row mb-[10px]`)}>
          <div className={cn(`flex`)}>
            <FaToolbox className={cn(`m-auto mr-[14px]`)}/>
          </div>
          <Link className={cn(`text-white`)} href="/HowItWorks" onClick={() => moveMenuFunc(0)}>
            How It Works
          </Link>
        </div>
      </div>
    </nav>
  );
}

{/* <div className={cn(`flex flex-row mb-[10px]`)}>
          <div className={cn(`flex`)}>
            <CgNotes className={cn(`m-auto mr-[14px]`)}/>
          </div>
          <h3 className={cn(`text-white`)}>Notes</h3>
        </div> */}