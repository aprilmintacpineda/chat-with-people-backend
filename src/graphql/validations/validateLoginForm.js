import validator from 'smart-input-validator';

export default function (args) {
  return {
    email: {
      value: args.email,
      errors: validator({
        email: args.email
      }, {
        email: 'required|email'
      }, {
        email: {
          _$all: 'Please enter your email.'
        }
      })
    },
    password: {
      value: args.password,
      errors: validator({
        password: args.password
      }, {
        password: 'required'
      }, {
        password: {
          required: 'Please enter your password.'
        }
      })
    }
  };
}