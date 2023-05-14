import classnames from 'classnames';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function HowItWorks() {
  return (
    <div className={classnames(`p-[30px]`)}>
      <div className={classnames(`flex flex-row`)}>
        <div className={classnames(`flex mr-[20px]`)}>
          <AiFillStar className={classnames(`m-auto`)}/>
        </div>
        <h1 className={classnames(`text-[24px]`)}>About</h1>
      </div>
      <p className={classnames(`mt-[20px]`)}>On the job hunt? Love checklists?  This app is for you.</p>
      <p className={classnames(`mt-[10px]`)}>Track how many companies have rejected you on the job search</p>
      <p className={classnames(`mt-[10px]`)}>The hope is that getting those 100 stars will motivate you to apply and interview for many more jobs than you would have otherwise. And though you're racking up rejections, every no leads you closer to that one yes. It is our hope that you won't ever get 100 stars; you'll have found a job first.</p>
    </div>
  )
}