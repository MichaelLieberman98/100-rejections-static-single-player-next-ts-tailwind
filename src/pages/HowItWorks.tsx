import classnames from 'classnames';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function HowItWorks() {
  return (
    <div className={classnames(`p-[30px]`)}>
      <div className={classnames(`flex flex-row`)}>
        <div className={classnames(`flex mr-[20px]`)}>
          <AiFillStar className={classnames(`m-auto`)}/>
        </div>
        <h1 className={classnames(`text-[24px]`)}>How It Works</h1>
      </div>
      <p className={classnames(`mt-[20px]`)}>Once you've gotten an official rejection from a job that you're interviewing with, click on the "plus" button to add a rejection.</p>
      <h4 className={classnames(`mt-[10px]`)}>1 yellow star = 1 rejection</h4>
      <p className={classnames(`mt-[10px]`)}>If you click on a star, you can view the rejection it corresponds to.</p>
      <h4 className={classnames(`mt-[20px]`)}>And that's it! Now go get interviewing!</h4>
    </div>
  )
}