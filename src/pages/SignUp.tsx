import { useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SignUpForm from '@/components/SignUpForm';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [alreadyExists, setAlreadyExists] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (password !== reEnterPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);

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
    }
  };

  return (
    <div className={cn(`mt-[20px] bg-[red] flex flex-col text-center`)}>
      <SignUpForm email={email}
        setEmail={setEmail}
        first_name={first_name}
        setFirstName={setFirstName}
        last_name={last_name}
        setLastName={setLastName}
        password={password}
        setPassword={setPassword}
        reEnterPassword={reEnterPassword}
        setReEnterPassword={setReEnterPassword}
        passwordsMatch={passwordsMatch}
        setPasswordsMatch={setPasswordsMatch}
        alreadyExists={alreadyExists}
        setAlreadyExists={setAlreadyExists}
        handleSubmit={handleSubmit}
      />
      {/* <form onSubmit={handleSubmit} className={cn(`max-w-[600px] w-[80%] mx-auto`)}>
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
      </form> */}
      <h3 className={cn(`absolute left-1/2 bottom-24 transform -translate-x-1/2`)}>
        Already have an account?{' '}
        <Link className={cn(``)} href="/Login">
          Login
        </Link>
      </h3>
    </div>
  );
};

export default SignUp;