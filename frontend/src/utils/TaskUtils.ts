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


export function isTaskNameInvalid(taskName: string) {
  // if(email === "")
  const sanitizedTaskName = taskName.trim();
  if (sanitizedTaskName.length === 0) return "Title can't be empty";
  if (sanitizedTaskName.length > 200) return "Title should be a maximum of 200 characters";
  return "";
}


export function isTaskDescInvalid(taskDesc: string) {
  const sanitizedDesc = taskDesc.trim();
  if (sanitizedDesc.length > 2000) return "Max 2000 characters allowed in description";
  return "";
}