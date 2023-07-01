import { useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import LoginForm from '@/components/LoginForm';

export default function Login() {
  const [email, setEmail] = useState('Retta.Paucek@gmail.com');
  const [password, setPassword] = useState('Av4lfY7CvOIQ9XG');

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      // Redirect to login page
      // console.log("LOGIN WORKED");
      router.push('/UserPage');
    } else {
      // Show error message
      const data = await res.json();
      // console.log("Login error message", data.message);
      // console.log("LOGIN DIDNT WORK");
    }
  };

  return (
    <div className={cn(`mt-[20px] bg-[red] flex flex-col text-center`)}>
      <LoginForm email={email} 
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
      {/* <h1 className={cn(``)}>Login</h1> */}
      {/* <form onSubmit={handleSubmit} className={cn(`max-w-[600px] w-[80%] mx-auto`)}> */}
        {/* <div className={cn(`flex flex-row justify-between`)}>
          <label htmlFor="email" className={cn(``)}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={cn(``)}
          />
        </div> */}
        
        {/* <br className={cn(``)}/> */}
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
        {/* <label htmlFor="password" className={cn(``)}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={cn(``)}
        />
        <br className={cn(``)}/>
        <button type="submit" className={cn(``)}>Login</button> */}
      {/* </form> */}
      {/* <h3>Already have an account? <span onClick={() => { router.push('/login') }}>Sign in</span></h3> */}
      <h3>
        Don't have an account?{' '}
        <Link href="/SignUp">
          Sign up
        </Link>
      </h3>
    </div>
  );
};
