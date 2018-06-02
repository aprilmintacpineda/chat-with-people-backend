class User {
  login = (payload, users, socket) => {
    users[payload.userData.user_id] = socket;
    users[payload.userData.user_id].emit('loggedIn');
  }
}

export default new User;