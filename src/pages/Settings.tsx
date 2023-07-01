import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import fs from 'fs';
import Link from 'next/link';
import path from 'path';
import { useRouter } from 'next/router';

import { User, Post } from '../types/types';

import { CiSettings } from "react-icons/ci";

export default function Settings({ user }: { user: User }) {
  // console.log(user);
  const posts: Post[] = user.posts;
  const [tempPic, setTempPic] = useState(user.profilePic);
  const [newPass, setNewPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [saveEnabled, setSaveEnabled] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setSaveEnabled(tempPic !== user.profilePic || newPass !== '');
  }, [tempPic, newPass]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file: File = e.target.files[0];
      console.log(file);
      // upload the file to your server or a cloud storage service (IN THE OFFICIAL VERSION)
      // and update the user's profile picture
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          // update the user's profile picture
          // user.profilePic = event.target.result;
          setTempPic(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSave() {
    console.log("handling save");
    let allGood: boolean = false;
    if (tempPic !== user.profilePic) {
      const picRes = await fetch('/api/editProfilePic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profilePic: tempPic }),
      });

      allGood = picRes.ok;
    }

    if (newPass.length > 0) {
      const passRes = await fetch('/api/editPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPass: newPass }),
      });

      allGood = passRes.ok;
    }

    if (allGood) {
      router.push('/UserPage');
    }
  }

  return (
    <div className={cn(`p-[20px] text-cente flex flex-col`)}>
      <h1>Settings</h1>
      <img className={cn(`w-[150px] h-[150px] rounded-full mr-[10px mx-auto`)} src={tempPic} alt="Pic"></img>
      <input type="file" id="profile-pic" onChange={handleFileChange} style={{ display: 'none' }} />
      <label htmlFor="profile-pic" className={cn(`cursor-pointer`)}>
        Change Profile Picture
      </label>
      <input 
        type={showPass ? 'text' : 'password'}
        value={newPass}
        onChange={e => setNewPass(e.target.value)}
        placeholder='New Password'/>
      <div>
        {showPass ? (
          <button onClick={() => setShowPass(!showPass)}>Hide</button>
        ) : (
          <button onClick={() => setShowPass(!showPass)}>Show</button>
        )}
      </div>
      <div>
        <Link legacyBehavior href="/UserPage">
          <a className={cn(``)}>
            back
          </a>
        </Link>
        <button onClick={() => handleSave()} disabled={!saveEnabled} className={cn(`${!saveEnabled ? 'font-[100]' : 'font-[500]'}`)}>Save</button>
      </div>
    </div>
  );
}

// {posts.map((post) => (
//   <div key={post.post_id}>
//     <h1>{post.company_name}</h1>
//     <p>{post.desc}</p>
//     <p>{post.date}</p>
//     <p>{post.time}</p>
//   </div>
// ))}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'currentUser.json');
  // console.log(filePath);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const user: User = JSON.parse(fileContents);
  // console.log(user.id);

  return { props: { user } };
}