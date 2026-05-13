export const loginSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
      errorMessage: "Please enter a valid email address",
    },
    password: {
      type: "string",
      minLength: 6,
      errorMessage: "Password must be at least 6 characters",
    },
  },
  additionalProperties: false,
};
