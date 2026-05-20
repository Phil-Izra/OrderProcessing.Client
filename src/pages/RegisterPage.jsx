import { useForm } from "react-hook-form";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ajvResolver } from "../schemas/ajvResolver";
import { registerSchema } from "../schemas/registerSchema";
import { register as registerUser } from "../api/authApi";
import { useAuthContext } from "../auth/useAuthContext";
import { useState } from "react";
export default function RegisterPage() {
  const navigate = useNavigate();
  const { signIn } = useAuthContext();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: ajvResolver(registerSchema) });
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword)
      return setError("Passwords do not match");
    try {
      setError("");
      const response = await registerUser(data);
      signIn(response);
      navigate("/profile"); // Take them to upload photo after register
    } catch {
      setError("Registration failed. Email may already be in use.");
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Paper elevation={4} sx={{ p: 4, width: 460, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
          Create Account
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {["fullName", "email", "password", "confirmPassword"].map((field) => (
          <TextField
            key={field}
            fullWidth
            label={
              field === "fullName"
                ? "Full Name"
                : field === "confirmPassword"
                  ? "Confirm Password"
                  : field.charAt(0).toUpperCase() + field.slice(1)
            }
            type={field.includes("assword") ? "password" : "text"}
            {...register(field)}
            error={!!errors[field]}
            helperText={errors[field]?.message}
            sx={{ mb: 2 }}
          />
        ))}
        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? "Creating Account..." : "Register"}
        </Button>
      </Paper>
    </Box>
  );
}
