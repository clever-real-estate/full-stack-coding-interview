import { object, ref, string } from "yup";

/**
 * Validation schema for forgot password form.
 */
export const ForgotPasswordSchema = object({
  email: string().label("Email").email().required().trim(),
});

/**
 * Validation schema for login form.
 */
export const LoginSchema = object({
  username: string().label("Username").required().trim(),
  password: string().label("Password").required().min(8).max(128),
});

/**
 * Validation schema for registration form.
 * Extends the LoginSchema to include additional fields.
 */
export const RegisterSchema = LoginSchema.shape({
  first_name: string().label("First Name").required().min(2).max(50).trim(),
  last_name: string().label("Last Name").required().min(2).max(50).trim(),
  email: string().label("Email").email().required().min(2).max(50).trim(),
  password_confirm: string()
    .label("Confirm Password")
    .required()
    .oneOf([ref("password")], "Passwords must match")
    .min(8)
    .max(128),
});

/**
 * Validation schema for updating user profile.
 * Includes first name and last name fields.
 */
export const UpdateProfileSchema = object({
  first_name: string().label("First Name").required().min(2).max(50).trim(),
  last_name: string().label("Last Name").required().min(2).max(50).trim(),
});

/**
 * Validation schema for changing user password.
 * Ensures the new password is different from the old password.
 */
export const ChangePasswordSchema = object({
  old_password: string().label("Current Password").required().min(8).max(128),
  new_password: string()
    .label("New Password")
    .required()
    .min(8)
    .max(128)
    .notOneOf([ref("old_password")], "New password must be different from current password"),
});
