export function validateString(string: string) {
   const letters = /^[A-Za-z\s]+$/;
   return string.match(letters) ? true : false
}