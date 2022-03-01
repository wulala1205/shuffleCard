export const AuthError = {
  NOT_FOUND: "User not found.",
  GENERAL_ERROR: "Some error occurred.",
  INVALID_RECORD: "Invalid Record",
  INVALID_RESPONSE: "Invalid Response",
}

export const isUndefinedOrNullOrEmpty = (input) => {
  return !input || input === '' || input === null || input.length === 0
}

export const getBearerToken = (authHeader) => authHeader && authHeader.split(' ')[1];