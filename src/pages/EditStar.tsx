import React, { useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { User, Post } from '../types/types';

import { AiFillStar, AiOutlineStar, AiOutlinePlus } from 'react-icons/ai';

import { IoMdArrowBack } from 'react-icons/io';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import currentUser from '../data/currentPost.json';
import currentPost from '../data/currentPost.json';

export default function EditStar() {
  let tempUser: Post = currentUser;
  let tempPost: Post = currentPost;
  let [companyName, setCompanyName] = useState(tempPost.companyName);
  let [desc, setDesc] = useState(tempPost.desc);
  let router = useRouter();

  const companyNameMaxChars = 30;
  let [companyNameCharCount, setCompanyNameCharCount] = useState(tempPost.companyName.length);
  const descMaxChars = 300;
  let [descCharCount, setDescCharCount] = useState(tempPost.desc.length);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch('/api/editstar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId: tempPost.postId, companyName: companyName, desc: desc }),
    });

    if (res.ok) {
      // console.log("ADDING STAR WORKED");
      router.push('/StarPage');
    } else {
      // Show error message
      const data = await res.json();
      // console.log("Adding Star error message", data.message);
      // console.log("LOGIN DIDNT WORK");
    }
  }

  function handleCompanyNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCompanyName(e.target.value);
    setCompanyNameCharCount(e.target.value.length);
  }

  function handleDescChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDesc(e.target.value);
    setDescCharCount(e.target.value.length);
  }

  return (
    <div className={cn(`p-[30px]`)}>
      <form className={cn(`flex flex-col`)} onSubmit={handleSubmit}>
        <div className={cn(`flex flex-row mb-[50px]`)}>
          <div className={cn(`flex mr-[20px]`)}>
            <AiFillStar className={cn(`m-auto`)}/>
          </div>
          <label className={cn(`visually-hidden`)} htmlFor="company_name">Company Name:</label>
          <input
            type="text"
            id="company_name"
            value={companyName}
            maxLength={companyNameMaxChars}
            onChange={handleCompanyNameChange}
            required
            placeholder="Company name"
            className={cn(`placeholder:p-[10px] bg-[#202028] mr-[20px] w-[400px]`)}
          />
          <h3>{companyNameCharCount} / {companyNameMaxChars}</h3>
        </div>
        <div>
        <label className={cn(`visually-hidden`)} htmlFor="description">Description</label>
          <textarea
            id="desc"
            value={desc}
            maxLength={descMaxChars}
            onChange={handleDescChange}
            required
            placeholder="Add any information you want about the company, your interview experience, etc."
            className={cn(`w-full placeholder:p-[10px] h-[300px] bg-[#202028]`)}
          />
          <h3 className={cn(`flex flex-row-reverse`)}>{descCharCount} / {descMaxChars}</h3>
        </div>

        <div className={cn(`absolute left-1/2 bottom-24 transform -translate-x-1/2 justify-between flex flex-row w-[300px]`)}>
          <Link legacyBehavior href="/StarPage">
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
          <button className={cn(`w-[50px] h-[50px] rounded-full bg-[#202028] flex`)} type="submit">
            <FaPencilAlt className={cn(`m-auto w-[50%] relative top-[-1px] left-[1px] h-auto`)}/>{}
          </button>
        </div>
      </form>
    </div>
  );
}