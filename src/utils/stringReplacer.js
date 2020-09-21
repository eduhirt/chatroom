export const removeEmail = (message) => {
  const regex = /([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/;

  if (message.search(regex) !== -1) {
    message = message.replace(regex, "*******");
  }

  return message;
};
