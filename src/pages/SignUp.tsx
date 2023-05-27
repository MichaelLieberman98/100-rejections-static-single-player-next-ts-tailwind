import { useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignUp = () => {
  const [email, setEmail] = useState('ab@gmail.com');
  const [first_name, setFirstName] = useState('laijdf');
  const [last_name, setLastName] = useState('ldfdfijast');
  const [password, setPassword] = useState('fasdfdsf');
  const [reEnterPassword, setReEnterPassword] = useState('fasdfdsf');
  
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (password !== reEnterPassword) setPasswordsMatch(true);
    else setPasswordsMatch(false);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, first_name, last_name, password }),
    });

    if (res.ok) {
      setAlreadyExists(false);
      // Redirect to login page
      // console.log("REGISTER WORKED");
      router.push('/Login');
    } else {
      // Show error message
      setAlreadyExists(true);
      // console.log("REGISTER DIDNT WORK");
    }
  };

  return (
    <div className={cn(`mt-[20px] bg-[red] flex flex-col text-center`)}>
      <h1 className={cn(``)}>Sign Up</h1>
      <h3 className={cn(`${alreadyExists ? 'block' : 'hidden'} bg-[#ff0000]`)}>Some info is repeated from another user</h3>
      <h3 className={cn(`${!passwordsMatch ? 'block' : 'hidden'} bg-[#ff0000]`)}>Passwords don't match</h3>
      <form onSubmit={handleSubmit} className={cn(`max-w-[600px] w-[80%] mx-auto`)}>
        <div className={cn(`flex flex-row justify-between`)}>
          <label htmlFor="email" className={cn(``)}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={cn(``)}
          />
        </div>
        
        <br className={cn(``)}/>
        {/* <label htmlFor="username" className={cn(``)}>Username:</label>
        <input
          type="text"
          id="username"
          value={}
          onChange={e => setUserName(e.target.value)}
          required
          className={cn(``)}
        />
        <br className={cn(``)}/> */}
        <label htmlFor="firstName" className={cn(``)}>First Name:</label>
        <input
          type="text"
          id="firstName"
          value={first_name}
          onChange={e => setFirstName(e.target.value)}
          required
          className={cn(``)}
        />
        <br className={cn(``)}/>
        <label htmlFor="lastName" className={cn(``)}>Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={last_name}
          onChange={e => setLastName(e.target.value)}
          required
          className={cn(``)}
        />
        <br className={cn(``)}/>
        <label htmlFor="password" className={cn(``)}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={cn(``)}
        />
        <br className={cn(``)}/>
        <label htmlFor="reEnterPassword" className={cn(``)}>Re-enter Password:</label>
        <input
          type="password"
          id="reEnterPassword"
          value={reEnterPassword}
          onChange={e => setReEnterPassword(e.target.value)}
          required
          className={cn(``)}
        />
        <br className={cn(``)}/>
        <button type="submit" className={cn(``)}>Sign Up</button>
      </form>
      {/* <h3>Already have an account? <span onClick={() => { router.push('/login') }}>Sign in</span></h3> */}
      <h3>
        Already have an account?{' '}
        <Link href="/login">
          Sign in
        </Link>
      </h3>
    </div>
  );
};

export default SignUp;
