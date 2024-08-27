export const respUserDto = (user) => {
  return {
    name: user.first_name + " " + user.last_name,
    email: user.email,
  };
};
