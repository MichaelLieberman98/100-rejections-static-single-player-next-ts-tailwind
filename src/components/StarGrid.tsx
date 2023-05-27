import React, { useEffect, useState } from 'react';

import { User, Post } from '../types/types';

import Star from './Star';

import starNums from '../data/starNums.json';

import currentUser from '../data/currentUser.json';

import cn from 'classnames';

type StarGridProps = {
  posts: Post[];
};

const StarGrid = ({ posts }: StarGridProps) => {
  const [w, setW] = useState<number>(0);
  const [numCols, setNumCols] = useState<number>(0);
  const [numRows, setNumRows] = useState<number>(0);
  const stars: JSX.Element[] = [];

  let tempUser: User = currentUser;
  // const [starSize]

  useEffect(() => {
    setW(window.innerWidth);
    const handleResize = () => setW(window.innerWidth);
    window.addEventListener("resize", handleResize);
    // console.log(w);

    // if (w <= 300) {
    //   numCols
    // }

    
    // for (let i = 0; i < 100; i++) {
    //   if (i < posts.length) {
    //     stars.push(<Star isLit={true} />)
    //   } else {

    //   }
    // }

    return () => window.removeEventListener("resize", handleResize);
  })
  const spacing = 2;

  // console.log("spacing", spacing);

  return (
    // w-[${w * 0.90}%]
    <div className={cn(`star-grid mx-auto mt-[50px] w-[90%] h-[auto] flex flex-row flex-wrap`)}>
      {/* <div className={cn(`flex h-auto w-auto`)}>
        <Star isLit={true}/>
      </div> */}

      {starNums.map((n) => {
        // console.log(n, posts.length, n < posts.length);
        return (
          <div>
            {/* <h6>id{tempUser.posts.length}</h6> */}
            <Star isLit={n < posts.length} n={n} postId={n < tempUser.posts.length ? tempUser.posts[n].postId : "null"} postsLength={posts.length}/>
          </div>
        )
      })}

      {/* {stars.map((star) => {

      })} */}

      {/* {rows} */}
      {/* <div className="star-row" style={{ height: "900px" }}>
        {[...Array(numStars % numColumns)].map((_, i) => (
          <div key={numStars - numStars % numColumns + i} className="star" style={{ width: starSize, height: starSize }} />
        ))}
      </div> */}
    </div>
  );
};

export default StarGrid;
