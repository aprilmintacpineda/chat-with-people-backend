# UNDER DEVELOPMENT

Trello board: https://trello.com/b/XoVn7s2F
Database Scheme: https://www.dbdesigner.net/designer/schema/172591

# chat-with-people-backend

Backend codes for the project ChatWithPeople web application. This project was part of my studies about JWT and GraphQL.

# What it does

- It's a simple chat application that uses JWT and GraphQL.
- You can register and of course log in.
- Search for users.
- Initiate chat with other users.
- Add other users to the conversation to create a group.
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
- JWT with JSRSASign
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

#### 1.5 Compile JavaScript and SASS

To build for dev mode `npm run webpack`. To build for production mode, which is minified and uglified, `npm run webpack:production`.

#### 1.6 Run it

To run in dev mode `npm run start`. To run in production mode `npm run start:production`.

Now you can access the web interface via `localhost:3000`.

# NPM Scripting

- `npm run eslint` should run eslint against `resources/js` and `src/` folders.

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