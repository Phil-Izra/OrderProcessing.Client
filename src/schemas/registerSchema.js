export const registerSchema = {
  type: 'object',
  required: ['fullName', 'email', 'password', 'confirmPassword'],
  properties: {
    fullName: {
      type: 'string',
      minLength: 2,
      maxLength: 100,
      errorMessage: 'Full name must be between 2 and 100 characters'
    },
    email: {
      type: 'string',
      format: 'email',
      errorMessage: 'Please enter a valid email address'
    },
    password: {
      type: 'string',
      minLength: 8,
      pattern: '^(?=.*[A-Z])(?=.*[0-9]).+$',
      errorMessage: 'Password needs 8+ chars, one uppercase, one number'
    },
    confirmPassword: {
      type: 'string',
      errorMessage: 'Please confirm your password'
    }
  },
  additionalProperties: false
};
