// https://www.tutorialrepublic.com/snippets/preview.php?topic=bootstrap&file=simple-registration-form

import cn from 'classnames';

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  first_name: string;
  setFirstName: (first_name: string) => void;
  last_name: string;
  setLastName: (last_name: string) => void;
  password: string;
  setPassword: (password: string) => void;
  reEnterPassword: string;
  setReEnterPassword: (reEnterPassword: string) => void;
  passwordsMatch: boolean;
  setPasswordsMatch: (passwordsMatch: boolean) => void;
  alreadyExists: boolean;
  setAlreadyExists: (alreadyExists: boolean) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function SignUpForm({
  email,
  setEmail,
  first_name,
  setFirstName,
  last_name,
  setLastName,
  password,
  setPassword,
  reEnterPassword,
  setReEnterPassword,
  passwordsMatch,
  setPasswordsMatch,
  alreadyExists,
  setAlreadyExists,
  handleSubmit
}: SignUpFormProps) {
  return (
    <form onSubmit={handleSubmit} className={cn(`sm:w-[400px] lg: bg-[blue] absolute w-auto tems-start mx-auto left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col px-[30px] py-[40px]`)}>
      <div className={cn(`flex flex-row justify-between items-center mb-[24px]`)}>
        <hr className={cn(`w-[100px] color-[#0000ff`)}/>
        <h1 className={cn(`text-[24px]`)}>Sign Up</h1>
        <hr className={cn(`w-[100px]`)}/>
      </div>
      <h3 className={cn(`${alreadyExists ? 'block' : 'hidden'} bg-[#ff0000]`)}>Some info is repeated from another user</h3>
      <h3 className={cn(`${!passwordsMatch ? 'block' : 'hidden'} bg-[#ff0000]`)}>Passwords don't match</h3>
      {/* <h4 className={cn(`text-[12px] mb-[24px]`)}>Create your account. It's free and only takes a minute</h4> */}
      <div className={cn(`flex flex-col gap-[24px] mb-[24px] sm:flex-col sm:gap-[24px] lg:flex-row lg:justify-between lg:gap-[24px] lg:h-[30px]`)}>
        <input
          type="text"
          id="firstName"
          value={first_name}
          placeholder='First Name'
          onChange={e => setFirstName(e.target.value)}
          required
          className={cn(`w-full placeholder:p-[12px] bg-[red]`)}
        />
        <input
          type="text"
          id="lastName"
          value={last_name}
          placeholder='Last Name'
          onChange={e => setLastName(e.target.value)}
          required
          className={cn(`w-full placeholder:p-[12px] bg-[orange]`)}
        />
      </div>

      <input
        type="email"
        id="email"
        value={email}
        placeholder='Email'
        onChange={e => setEmail(e.target.value)}
        required
        className={cn(`mb-[24px] placeholder:p-[12px] h-[30px]`)}
      />
      <input
        type="password"
        id="password"
        value={password}
        placeholder='Password'
        onChange={e => setPassword(e.target.value)}
        required
        className={cn(`mb-[24px] placeholder:p-[12px] h-[30px]`)}
      />
      <input
        type="password"
        id="reEnterPassword"
        value={reEnterPassword}
        placeholder='Confirm Password'
        onChange={e => setReEnterPassword(e.target.value)}
        required
        className={cn(`mb-[24px] placeholder:p-[12px] h-[30px]`)}
      />
      <button type="submit" className={cn(`h-[30px]`)}>Sign Up</button>
    </form>
  );
}