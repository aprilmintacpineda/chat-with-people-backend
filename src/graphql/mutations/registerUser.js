import { GraphQLString, GraphQLObjectType } from 'graphql';
import PasswordHash from 'password-hash';
import nodemailer from 'nodemailer';
import createType from '../types/create';
import validateInputs from '../validations/validateRegisterForm';
import * as Utils from '../../Utils';
import { sequelize } from '../../models';
import welcomeMail from '../../mails/welcome';
import nodeMailerConfig from '../../config/nodemailer';

export default {
  type: createType,
  args: {
    fullname: { type: GraphQLString },
    sex: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    repassword: { type: GraphQLString }
  },
  resolve (obj, args) {
    return new Promise((resolve, reject) => {
      const validatedInputs = validateInputs(args);

      Promise.all([
        sequelize.query('select count(*) as doesExist from user where email = :email', {
          replacements: {
            email: validatedInputs.email.value
          },
          type: sequelize.QueryTypes.SELECT
        }),
        sequelize.query('select count(*) as doesExist from user where username = :username', {
          replacements: {
            username: validatedInputs.username.value
          },
          type: sequelize.QueryTypes.SELECT
        })
      ])
      .then(([ [ QEmail ] , [ QUsername ] ]) => {
        if (QEmail.doesExist) validatedInputs.email.errors.push('Email is already registered.');
        if (QUsername.doesExist) validatedInputs.username.errors.push('Username is already taken.');

        if (validatedInputs.fullname.errors.length
        || validatedInputs.username.errors.length
        || validatedInputs.email.errors.length
        || validatedInputs.sex.errors.length
        || validatedInputs.password.errors.length
        || validatedInputs.repassword.errors.length) {
          return reject(JSON.stringify(validatedInputs));
        }

        const confirm_token = Utils.generateUID(20);

        const html = welcomeMail(validatedInputs.fullname.value.split(' ')[0], confirm_token);

        const mailOptions = {
          from: 'hello@chatwithpeople.io',
          to: validatedInputs.email.value,
          subject: 'Welcome to Chat-With-People!',
          html
        };

        return Promise.all([
          nodemailer.createTransport(nodeMailerConfig).sendMail(mailOptions),
          sequelize.query('insert into user (user_id, username, email, password, fullname, sex, created_at, confirm_token) values (:user_id, :username, :email, :password, :fullname, :sex, :created_at, :confirm_token)', {
            replacements: {
              user_id: Utils.generateUID(20),
              username: validatedInputs.username.value,
              email: validatedInputs.email.value,
              password: PasswordHash.generate(validatedInputs.password.value),
              fullname: Utils.ucwords(validatedInputs.fullname.value),
              sex: validatedInputs.sex.value,
              created_at: Date.now(),
              confirm_token
            }
          })
        ]);
      })
      .then(() => resolve({
        result: 'OK'
      }));
    });
  }
};