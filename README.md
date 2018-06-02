# UNDER DEVELOPMENT

Trello board: https://trello.com/b/XoVn7s2F

Database Scheme: https://www.dbdesigner.net/designer/schema/172591

# chat-with-people-backend

Backend codes for the project ChatWithPeople web application. This project was part of my studies about JWT and GraphQL.

Chat with people is a social networking application.

# What it does

- It's a simple chat application that uses JWT and GraphQL.
- Account registration.
- Email verification (I used [mailtrap](https://mailtrap.io/))
- Sign in.
- Search for users (name, email, or username).
- Initiate chat with other users. You can even chat yourself (if it makes you happy).
- Create group chats and invite other users.

# Technologies used

- WorkBox
- ExpressJS
- React-Dom
- React-Native
- React-Redux
- React-Router
- Redux-Saga
- Axios
- Socket.io
- GraphQL
- JWT
- Sequelize
- SASS
- Smart-Input-Validator
- Redux-Abstract

###### Dev

- Babel
- Nodemon
- Webpack
- Autoprefixer
- ESLint

# Run it

## 1. Set up the backend and web interface

```
git clone git@github.com:aprilmintacpineda/chat-with-people-backend.git
cd chat-with-people-backend
```

#### 1.1 Install all dependencies

```
npm i
```

#### 1.2 Set up configuration files

```
npm run config:init
```

#### 1.3 Configure database

Edit `src/config/sequelize.json`. It should look something like this:

```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "chat_with_people",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  // ......
```

After you have set that up, you can create the database and run the migration by running `npm run db:install`. You can also re-install it from (if for some reason you want that) by running `npm run db:reinstall`.

###### Note

- If you are going to run production mode, you need to edit the `production` key as well.

#### 1.4 Configure email

Edit `src/config/nodemailer.js`. I use mailtrap to test my emails. It would look something like this:

```
{
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-username',
    pass: 'your-password'
  }
}
```

For more details, please checkout [nodemailer's documentation](https://nodemailer.com/smtp/).

#### 1.5 Run it

###### Dev

```
npm run webpack
npm run start
```

###### Production

This command will both build the code and create a production server using the build codes.

```
npm run start:production
```

Now you can access the web interface via `localhost:3000`.

# NPM Scripting

- `npm run eslint` should run eslint against `resources/js` and `src/` folders.
- `npm run build` should use `babel` to build all files in `src/` folder.

# Clean up

Once you're done looking at it, and you've decided to delete the whole thing.

```
npm run db:uninstall
cd ..
rm -rf chat-with-people-backend
rm -rf chat-with-people-mobile
```

That should:

- Delete the database.
- Delete the backend and the web interface source code.
- Delete the mobile source code.

# License

MIT

Created with <3 by [April Mintac Pineda](https://aprilmintacpineda.github.io/).

Credits to the open source projects that I used for this project.