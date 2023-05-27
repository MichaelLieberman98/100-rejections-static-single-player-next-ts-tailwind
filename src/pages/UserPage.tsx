import classnames from 'classnames';
import fs from 'fs';
import Link from 'next/link';
import path from 'path';

import StarGrid from '../components/StarGrid';

import { User, Post } from '../types/types';

export default function UserPage({ user }: { user: User }) {
  // console.log(user);
  const posts: Post[] = user.posts;

  function addPost() {

  }
  return (
    <div className={classnames(``)}>
      <h1>{user.id}</h1>
      <h1>{user.email}</h1>
      <h1>{user.firstName}</h1>
      <h1>{user.lastName}</h1>
      <StarGrid posts={posts}/>
      <Link href="/AddStar" className={classnames(`absolute left-1/2 bottom-24 transform -translate-x-1/2`)}>Add</Link>
      {/* <button className={classnames(`absolute left-1/2 bottom-24 transform -translate-x-1/2`)} onClick={addPost}>Add</button> */}
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