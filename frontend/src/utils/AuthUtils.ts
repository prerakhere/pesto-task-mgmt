/**
 * CLIENT SIDE VALIDATIONS
 * empty fields
 * invalid fields
 * email invalid
 * password invalid
 * 
 * 
 * 
 * SERVER RESPONSES
 * invalid credentials
 * no user found
 * incorrect password
 */


export function isEmailInvalid(email: string) {
  // if(email === "")
  const sanitizedEmail = email.trim();
  const error = "Invalid email";
  if (sanitizedEmail.indexOf(' ') > 0) return error;
  const regex = /\S+@\S+\.\S+/;
  return regex.test(sanitizedEmail) ? "" : error;
}


export function isPasswordInvalid(password: string) {
  if (password.indexOf(' ') > 0) return "No spaces allowed in password";
  if (password.length < 6) return "Password must contain at least 6 characters";
  return "";
}