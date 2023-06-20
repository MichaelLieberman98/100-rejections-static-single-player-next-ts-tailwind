import { faker } from '@faker-js/faker';
import { User, Post } from '../types/types';

export default function generateUsers(numUsers: number, minPosts: number, maxPosts: number) {
  let users: User[] = [];

  for (let i = 0; i < numUsers; i++) {
    const profilePic = faker.image.avatar();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = `${firstName}.${lastName}@gmail.com`;
    const id = faker.string.alphanumeric(8);
    const password = faker.internet.password();

    const numPosts = Math.floor(Math.random() * (maxPosts - minPosts + 1)) + minPosts;
    
    let posts: Post[] = [];
    let number: number = 1;

    for (let j = 0; j < numPosts; j++) {
      const postId = faker.string.alphanumeric(8);
      const companyName = faker.company.name();
      const desc = faker.lorem.sentence();
      const userId = id;
      const date = faker.date.between('2023-01-01', '2023-03-31');
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      const time = faker.date.between('2023-01-01T12:00:00', '2023-01-01T18:00:00');
      const formattedTime = `${time.getHours()}:${time.getMinutes()} PM`;
      const timeInSeconds = Math.round((date.getTime() - new Date('2000-01-01T12:00:00').getTime()) / 1000);

      posts.push({
        postId: postId,
        companyName: companyName,
        desc: desc,
        date: formattedDate,
        time: formattedTime,
        timeInSeconds: timeInSeconds,
        userId: userId,
      });
    }

    users.push({
      profilePic: profilePic,
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      posts: posts
    });
  }

  return users;
}