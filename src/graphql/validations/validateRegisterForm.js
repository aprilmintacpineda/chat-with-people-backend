import validator from 'smart-input-validator';

export default function (args) {
  return {
    fullname: {
      value: args.fullname,
      errors: validator({
        fullname: args.fullname
      }, {
        fullname: 'required|allowedChars:alphabets,spaces'
      }, {
        fullname: {
          _$all: 'Please enter your real full name.'
        }
      })
    },
    sex: {
      value: args.sex,
      errors: validator({
        sex: args.sex
      }, {
        sex: 'required|in:Male,Female'
      }, {
        sex: {
          required: 'Please specify your sexual orientation.',
          in: 'Please select a valid option from the menu.'
        }
      })
    },
    username: {
      value: args.username,
      errors: validator({
        username: args.username
      }, {
        username: 'required|allowedChars:alphabets,numbers'
      }, {
        username: {
          required: 'Please enter your desired username.',
          allowedChars: 'Username is invalid, must only be alphabets and numbers.'
        }
      })
    },
    email: {
      value: args.email,
      errors: validator({
        email: args.email
      }, {
        email: 'required|email'
      }, {
        email: {
          _$all: 'Please enter your real email.'
        }
      })
    },
    password: {
      value: args.password,
      errors: validator({
        password: args.password
      }, {
        password: 'required|minLen:8'
      }, {
        password: {
          required: 'Please enter your desired password.',
          minLen: 'Your password is too short.'
        }
      })
    },
    repassword: {
      value: args.repassword,
      errors: validator({
        repassword: args.repassword
      }, {
        repassword: `required|equals:${args.password}`
      }, {
        repassword: {
          required: 'Please retype your password.',
          equals: 'Your passwords do not match.'
        }
      })
    }
  };
}