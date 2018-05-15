# UNDER DEVELOPMENT

This project was part of my studies about JWT and GraphQL.

# chat-with-people-backend

Backend codes for the project ChatWithPeople web application.

# What it does

- It's a simple chat application that uses JWT and GraphQL.
- You can register and of course log in.
- Search for users.
- Initiate chat with other users.
- You can even chat yourself (if it makes you happy).

# Technologies used

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

After you have set that up.

```
npm run db:init
npm run db:install
```

#### 1.3 Notes

- If you are going to run production mode, you need to edit the `production` key as well.

#### 1.4 Configure email

Edit `src/config/nodemailer.js`. I use mailtrap to test my emails. It would look something like this

```
{
  user: 'inbox-username',
  pass: 'inbox-password',
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false // true for 465, false for other ports
};
```

#### 1.5 Run it

To run in dev mode `npm run start`. To run in production mode `npm run start:production`.

Now you can access the web interface via `localhost:3000`.