export function formatAuthor(email: string) {
  return email.split('@')[0];
}

export function formatDate(date: string) {
  return new Date(date).toLocaleString("en-GB");
}