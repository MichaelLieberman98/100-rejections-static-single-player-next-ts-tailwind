import cn from 'classnames';
import fs from 'fs';
import Link from 'next/link';
import path from 'path';

import StarGrid from '../components/StarGrid';

import { User, Post } from '../types/types';

export default function UserPage({ user }: { user: User }) {
  // console.log(user);
  const posts: Post[] = user.posts;

  return (
    <div className={cn(`text-center`)}>
      <img className={cn(`w-[150px] h-[150px] rounded-full mr-[10px mx-auto`)} src={user.profilePic} alt="Pic"></img>
      {/* <div className={cn(`flex flex-row w-[90%] mx-auto`)}> */}
        {/* <div className={cn(`mr-[10px] bg-[green] px-[10px] rounded-[10px]`)}>
        </div> */}
      {/* </div> */}
      <h1 className={cn(`text-[30px] mx-auto`)}>{user.firstName} {user.lastName}</h1>
      <StarGrid data-textid="star-grid" posts={posts}/>
      <Link href="/AddStar" className={cn(`absolute left-1/2 bottom-24 transform -translate-x-1/2`)}>Add</Link>
      {/* <button className={cn(`absolute left-1/2 bottom-24 transform -translate-x-1/2`)} onClick={addPost}>Add</button> */}
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