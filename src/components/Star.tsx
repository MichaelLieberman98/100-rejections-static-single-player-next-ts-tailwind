import classnames from 'classnames';

import { User, Post } from '../types/types';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import currentUser from '../data/currentUser.json';

import { useRouter } from 'next/router';

type StarProps = {
  isLit: boolean;
  n: number;
  postId: string;
  postsLength: number;
}

export default function Star({ isLit, n, postId, postsLength }: StarProps) {
  let tempUser: User = currentUser;
  const router = useRouter();
  // console.log("inside star", isLit, n, postsLength);
  // const [isFilled, setIsFilled] = useState(false)
  // let clicked: JSX.Element = isFilled ? filledStar : emptyStar
  // onClick={() => {setIsFilled(!isFilled)}}
  async function handleStarClick() {
    if (postId !== "null") {
      let post: Post = tempUser.posts.filter(post => postId === post.postId)[0];
      // console.log(post);
      let postJSON = JSON.stringify(post, null, 2);
      const postResponse = await fetch('/api/appendToFile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: postJSON, fileName: "currentPost" })
      });

      if (postResponse.ok) {
        // Redirect to login page
        // console.log("currentPost appended to file WORKED");
        router.push('/StarPage');
      } else {
        // Show error message
        const data = await postResponse.json();
        // console.log("currentPost error message", data.message);
        // console.log("LOGIN DIDNT WORK");
      }
    }
    // console.log(currentUser.posts);
    // let validPosts = currentUser.posts.filter(post => postId === post.postId);
    // console.log(validPosts);
    // let post: Post = currentUser.posts.filter(post => postId === post.postId)[0];
    // console.log(post);
  }
  return (
    <div className={classnames(`pr-1.5 lg:py-2 lg:px-1.5`)}>
      <button onClick={() => (handleStarClick())}>
        {isLit ? (
          // <div className={classnames(`filled ${n < postsLength}`)}>
            <AiFillStar/>
          // </div>
        ) : (
          // <div className={classnames(`empty ${n < postsLength}`)}>
            <AiOutlineStar/>
          // </div>
        )}
      </button>
    </div>
  )
}

const filledStar = <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12"  fill="#FFD707"  viewBox="0 0 48 48">
<path d="m11.65 44 3.25-14.05L4 20.5l14.4-1.25L24 6l5.6 13.25L44 20.5l-10.9 9.45L36.35 44 24 36.55Z"  />
</svg>

const emptyStar = <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 48 48" fill="#A8A8A8" className='h-10 w-10 md:h-12 md:w-12'>
<path d="m11.65 44 3.25-14.05L4 20.5l14.4-1.25L24 6l5.6 13.25L44 20.5l-10.9 9.45L36.35 44 24 36.55Z"  />
</svg>