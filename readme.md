
# ShareThing

ShareThing is a site designed especially for colleges. It provides easy access to blogs, entities, topics, and other content posted by students within the college. As it is only available to college students in one particular college, students can discuss problems they have faced and find solutions. Additionally, the college can notify students about upcoming events, exams, and other activities through this system overriding the traditional notification system.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

[`JWT_SECRET`](https://www.npmjs.com/package/jsonwebtoken): json web token private string/key 

`DB_STR`: mongodb atlas connection string


## Project setup

Before starting the project, you must install Nodejs or npm 
```powershell
...\sharething> node app.js
...\sharething> cd client
...\sharething\client> npm start
```
## Demo
[![Netlify Status](https://api.netlify.com/api/v1/badges/b71865d9-c48a-4e41-bf65-44cbf981184c/deploy-status)](https://www.netlify.com/) <br/>
[Click here for demo](https://sharething.netlify.app/)
 * Note: Due to the fact that it's designed for college students, you can't just register yourself. For access to this website, you may receive a password or email from the college administration. For now use ```example@gmail.com``` as email and ```example123``` as password. 


 
## Screenshots
### - Intro page
![Intro page](https://user-images.githubusercontent.com/72245121/210181651-1909d9b0-2acd-41b6-8ab5-90e2b2f970c1.png)
### - Home page
![home page](https://user-images.githubusercontent.com/72245121/210181725-71b78161-9d87-4d6b-aa29-5bca846b4263.png)
### - Admin page
![dashboard](https://user-images.githubusercontent.com/72245121/210181665-0cd3f20b-21e7-47fb-85b0-bcd8350250bd.png)
### - About ShareThing
![about page](https://user-images.githubusercontent.com/72245121/210181672-c1e1fa50-f97c-43c8-9068-628c32dae885.png)

