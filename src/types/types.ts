export type User = {
  _id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  posts: Post[];
};

export type Post = {
  post_id: number
  company_name: string
  desc: string
  date: string
  time: string
  user_id: number
}