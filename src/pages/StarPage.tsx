import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
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

import path from 'path';

import fs from 'fs';

interface StarPageProps {
  currentPost: Post;
}

export default function StarPage({ currentPost }: StarPageProps) {
  let router = useRouter();
  let tempUser: User = currentUser;
  console.log(currentPost);
  // let tempPost: Post = post;
  // console.log(tempPost.companyName);
  // console.log(tempPost.desc);
  let [sureToDelete, setSureToDelete] = useState(false);
  let [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    // tempPost = currentUser.posts.filter(post => post.postId === tempPost.postId)[0];

  }, [])

  function handleEdit() {
    router.push('/EditStar');
  }

  async function handleYesDelete() {
    const deleteRes = await fetch('/api/deletestar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: currentPost.postId }),
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
        <h1 className={classnames(`text-[24px]`)}>{currentPost.companyName}</h1>
      </div>
      <p className={classnames(`mt-[20px]`)}>{currentPost.desc}</p>
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

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const currentPostPath = path.join(process.cwd(), 'src', 'data', 'currentPost.json')
  const currentPostContents = fs.readFileSync(currentPostPath, 'utf8')
  const post: Post = JSON.parse(currentPostContents)
  const desiredPostId = post.postId;
  
  const currentUserPath = path.join(process.cwd(), 'src', 'data', 'currentUser.json')
  const currentUserContents = fs.readFileSync(currentUserPath, 'utf8')
  // console.log("currentUserContents", currentUserContents);
  const user: User = JSON.parse(currentUserContents)
  // console.log("user STUFF", user);
  const posts = user.posts;
  // console.log("POOOOSTS", posts);

  // console.log("desired post id", desiredPostId);

  // Find the user with the given userId
  const currentPost = posts.find(post => post.postId === desiredPostId);
  // console.log("CURRENT POSTS FOUND", currentPost);

  // Find the post with the given postId

  // Check if the post was found
  if (!currentPost) {
    // If the post was not found, return a 404 error
    return {
      notFound: true,
    }
  }

  return {
    props: {
      currentPost
    }
  }
}
