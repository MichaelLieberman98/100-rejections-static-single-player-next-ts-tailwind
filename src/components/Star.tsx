import { useState} from "react";
import classnames from 'classnames';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';


type StarProps = {
  isLit: boolean;
}

export default function Star({ isLit }: StarProps) {
  const [isFilled, setIsFilled] = useState(false)
  // let clicked: JSX.Element = isFilled ? filledStar : emptyStar
  return (
    <div className={classnames(`pr-1.5 lg:py-2 lg:px-1.5`)}>
      <button onClick={() => {setIsFilled(!isFilled)}}>
        {isFilled ? <AiFillStar /> : <AiOutlineStar />}
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