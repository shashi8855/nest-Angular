/* eslint-disable prettier/prettier */
export const UserQueries = {

  existingUser: 'SELECT * FROM users WHERE email = ? OR phone_number = ?',

  createUser: 'INSERT INTO users SET ?',

  findAll: 'SELECT * FROM users',

  findOneById: 'SELECT * FROM users WHERE id = ?',

  updateUser:
    'UPDATE users SET name = ?, email = ?, phone_number = ?, address = ? WHERE id = ?',

  deleteUser: 'DELETE FROM users WHERE id = ?',
};
