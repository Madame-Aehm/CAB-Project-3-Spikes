export function formatAuthor(email) {
  return email.split('@')[0];
}

export function formatDate(date) {
  return new Date(date).toString("en-GB");
}