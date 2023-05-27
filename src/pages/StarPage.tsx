import React, { useState } from 'react';
import classnames from 'classnames';

import currentUser from '../data/currentUser.json';
import currentPost from '../data/currentPost.json';

import { User, Post } from '../types/types';

import Link from 'next/link';
import cn from 'classnames';

import { AiFillStar, AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';

import { IoMdArrowBack } from 'react-icons/io';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import { useRouter } from 'next/router';

export default function StarPage() {
  let router = useRouter();
  let tempUser: User = currentUser;
  let tempPost: Post = currentPost;
  let [sureToDelete, setSureToDelete] = useState(false);

  function handleEdit() {
    router.push('/EditStar');
  }

  async function handleYesDelete() {
    const deleteRes = await fetch('/api/auth/deletestar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: tempPost.postId }),
    });

    if (deleteRes.ok) {
      console.log("DELETING STAR WORKED");
      setSureToDelete(false);
      router.push('/UserPage');
    } else {
      // Show error message
      const data = await deleteRes.json();
      console.log("Deleting Star error message", data.message);
      // console.log("LOGIN DIDNT WORK");
    }
  }
  return (
    <div className={classnames(`p-[30px]`)}>
      <div className={classnames(`flex flex-row`)}>
        <div className={classnames(`flex mr-[20px]`)}>
          <AiFillStar className={classnames(`m-auto`)}/>
        </div>
        <h1 className={classnames(`text-[24px]`)}>{tempPost.companyName}</h1>
      </div>
      <p className={classnames(`mt-[20px]`)}>{tempPost.desc}</p>
      <div className={cn(`absolute left-1/2 bottom-24 transform -translate-x-1/2 justify-between flex flex-row w-[300px]`)}>
        <Link legacyBehavior href="/UserPage">
          <a className={cn(`w-[50px] h-[50px] rounded-full bg-[#202028] flex`)}>
            <IoMdArrowBack className={cn(`m-auto w-[80%] h-auto`)}/>
          </a>
        </Link>
        {/* <div className={cn(`w-[50px] h-[50px] rounded-full bg-[#202028] flex`)}>
          <IoMdArrowBack className={cn(`m-auto w-[80%] h-auto`)}/>
        </div> */}
        {/* <Link legacyBehavior href="/">
          <a className={cn(`w-[50px] h-[50px] rounded-full bg-[#202028] flex`)}>
            <AiOutlinePlus className={cn(`m-auto w-[80%] h-auto`)}/>
          </a>
        </Link> */}
        <button className={cn(`w-[50px] h-[50px] rounded-full bg-[#202028] flex`)} onClick={() => {handleEdit()}}>
          <FaPencilAlt className={cn(`m-auto w-[50%] relative top-[-1px] left-[1px] h-auto`)}/>{}
        </button>
        <button className={cn(`w-[50px] h-[50px] rounded-full bg-[#202028] flex`)} onClick={() => {setSureToDelete(!sureToDelete)}}>
          <FaTrashAlt className={cn(`m-auto w-[50%] h-auto`)}/>{}
        </button>
      </div>
      <div className={cn(`bg-[green] absolute left-1/2 transform -translate-x-1/2 bottom-1/2 -translate-y-1/2 w-[200px] h-[100px] ${sureToDelete ? 'flex' : 'hidden'} flex-col text-center justify-between`)}>
        <h1>Are you sure you want to delete this post?</h1>
        <div className={cn(`flex flex-row justify-between mx-auto w-[100px]`)}>
          <button className={cn(`bg-[blue]`)} onClick={() => {setSureToDelete(!sureToDelete)}}>
            <h3>NO</h3>
          </button>
          <button className={cn(`bg-[red]`)} onClick={() => {handleYesDelete()}}>
            <h3>YES</h3>
          </button>
        </div>
      </div>
    </div>
  )
}