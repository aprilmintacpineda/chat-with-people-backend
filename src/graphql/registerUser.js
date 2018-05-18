import { GraphQLString, GraphQLObjectType } from 'graphql';
import validator from 'smart-input-validator';
import PasswordHash from 'password-hash';
import createType from './types/create';
import validateInputs from './validations/validateRegisterForm';
import * as Utils from '../Utils';
import { sequelize, Sequelize } from '../models';

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

        return sequelize.query('insert into user (user_id, username, email, password, fullname, sex, created_at) values (:user_id, :username, :email, :password, :fullname, :sex, :created_at)', {
          replacements: {
            user_id: Utils.generateUID(20),
            username: validatedInputs.username.value,
            email: validatedInputs.email.value,
            password: PasswordHash.generate(validatedInputs.password.value),
            fullname: Utils.ucwords(validatedInputs.fullname.value),
            sex: validatedInputs.sex.value,
            created_at: Date.now()
          }
        });
      })
      .then(() => resolve({
        result: 'OK'
      }));
    });
  }
};