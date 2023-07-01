

import cn from 'classnames';

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit
}: LoginFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Log in</h1>
      <input
        type="email"
        id="email"
        value={email}
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        required
        className={cn(``)}
      />
      <input
        type="password"
        id="password"
        value={password}
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
        required
        className={cn(``)}
      />
      <button type="submit" className={cn(``)}>Log in</button>
    </form>
  );
}