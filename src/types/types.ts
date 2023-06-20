export type User = {
  profilePic: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  posts: Post[];
};

export type Post = {
  postId: string
  companyName: string
  desc: string
  date: string
  time: string
  timeInSeconds: number
  userId: string
}

// export type PostWithUserInfo = {
//   company_name: string;
//   desc: string;
//   date: string;
//   time: string;
//   user_id: string;
// };