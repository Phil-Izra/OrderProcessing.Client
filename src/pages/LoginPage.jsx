import { useForm } from "react-hook-form";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ajvResolver } from "../schemas/ajvResolver";
import { loginSchema } from "../schemas/loginSchema";
import { login } from "../api/authApi";
import { useAuthContext } from "../auth/useAuthContext";
import { useState } from "react";
export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuthContext();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: ajvResolver(loginSchema) });
  const onSubmit = async (data) => {
    try {
      setError("");
      const response = await login(data);
      signIn(response);
      navigate("/orders");
    } catch {
      setError("Invalid email or password. Please try again.");
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, width: 420, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">
          Sign In
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{ mb: 3 }}
        />
        <Button
          variant="contained"
          fullWidth
          size="large"
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
        <Box textAlign="center" mt={2}>
          <Link
            onClick={() => navigate("/register")}
            sx={{ cursor: "pointer" }}
          >
            Don't have an account? Register
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
