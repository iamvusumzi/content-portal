import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  MenuItem,
  CircularProgress,
  LinearProgress,
  Link as MuiLink,
  IconButton,
  Tooltip,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { RegisterRequest } from "../types/auth";
import type { AxiosError } from "axios";

type StrengthLevel = "Weak" | "Medium" | "Strong" | "";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    password: "",
    adminSecret: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [strength, setStrength] = useState<StrengthLevel>("");

  // 🔍 Password strength logic
  const calculateStrength = (password: string): StrengthLevel => {
    if (!password) return "";
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const mediumRegex = /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,})$/;

    if (strongRegex.test(password)) return "Strong";
    if (mediumRegex.test(password)) return "Medium";
    return "Weak";
  };

  // 🔄 Update password strength & matching validation in real time
  useEffect(() => {
    setStrength(calculateStrength(formData.password));
    if (confirmPassword && formData.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [formData.password, confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (passwordError || !formData.password || !formData.username) return;

    setLoading(true);
    try {
      await register(formData, role === "ADMIN");
      navigate("/");
    } catch (err: unknown) {
      setError(
        ((err as AxiosError)?.response?.data as { message: string })?.message ||
          (role === "ADMIN"
            ? "Admin registration failed — invalid secret or username exists"
            : "Registration failed — username may already exist")
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid =
    !formData.username ||
    !formData.password ||
    !confirmPassword ||
    !!passwordError ||
    (role === "ADMIN" && !formData.adminSecret);

  // 🎨 Strength meter color mapping
  const strengthColor =
    strength === "Strong"
      ? "success"
      : strength === "Medium"
      ? "warning"
      : "error";

  const strengthValue =
    strength === "Strong" ? 100 : strength === "Medium" ? 60 : 30;

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Create an Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, width: "100%" }}
        >
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            slotProps={{
              input: {
                endAdornment: (
                  <Tooltip
                    title={
                      <Box sx={{ textAlign: "left" }}>
                        <Typography variant="body2">
                          🔐 Password must include:
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: "20px" }}>
                          <li>At least 8 characters</li>
                          <li>One uppercase & lowercase letter</li>
                          <li>One number</li>
                          <li>One special character</li>
                        </ul>
                      </Box>
                    }
                    arrow
                    placement="top"
                  >
                    <IconButton size="small">
                      <InfoOutlinedIcon fontSize="small" color="action" />
                    </IconButton>
                  </Tooltip>
                ),
              },
            }}
          />

          {formData.password && (
            <Box sx={{ mt: 1, mb: 1 }}>
              <LinearProgress
                variant="determinate"
                value={strengthValue}
                color={strengthColor}
                sx={{ height: 6, borderRadius: 2 }}
              />
              <Typography
                variant="caption"
                sx={{
                  color:
                    strength === "Strong"
                      ? "success.main"
                      : strength === "Medium"
                      ? "warning.main"
                      : "error.main",
                }}
              >
                {strength && `${strength} password`}
              </Typography>
            </Box>
          )}

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />

          <TextField
            select
            label="Role"
            fullWidth
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value as "USER" | "ADMIN")}
          >
            <MenuItem value="USER">User</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </TextField>

          {role === "ADMIN" && (
            <TextField
              type="password"
              label="Admin Secret Key"
              name="adminSecret"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.adminSecret}
              onChange={handleChange}
            />
          )}

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading || isFormInvalid}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Register"
            )}
          </Button>

          <Typography
            variant="body2"
            sx={{ mt: 3, textAlign: "center", color: "text.secondary" }}
          >
            Already have an account?{" "}
            <MuiLink
              component={Link}
              to="/login"
              underline="hover"
              color="primary"
            >
              Login
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
