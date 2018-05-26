class User {
  login = (payload, users, socket) => {
    users[payload.userData.user_id] = socket;
  }
}

export default new User;