import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { uploadPhoto } from "../api/authApi";
import { useAuthContext } from "../auth/useAuthContext";
export default function PhotoUpload({ onSuccess }) {
  const { token } = useAuthContext();
  const [mode, setMode] = useState("upload");
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const webcamRef = useRef(null);
  const fileRef = useRef(null);
  // Capture from webcam
  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setPreview(imageSrc);
  }, []);
  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return setError("Please select an image file");
    if (file.size > 5 * 1024 * 1024)
      return setError("Image must be less than 5MB");
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };
  // Upload to backend
  const handleUpload = async () => {
    if (!preview) return;
    try {
      setUploading(true);
      setError(""); // Convert base64 to blob
      const res = await fetch(preview);
      const blob = await res.blob();
      const formData = new FormData();
      formData.append("photo", blob, "photo.jpg");
      const result = await uploadPhoto(formData, token);
      setSuccess(true);
      onSuccess?.(result.photoUrl);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <Box>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(_, v) => v && setMode(v)}
        sx={{ mb: 3 }}
      >
        <ToggleButton value="upload">
          <UploadFileIcon sx={{ mr: 1 }} /> Upload File
        </ToggleButton>
        <ToggleButton value="camera">
          <CameraAltIcon sx={{ mr: 1 }} /> Use Camera
        </ToggleButton>
      </ToggleButtonGroup>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Photo uploaded successfully!
        </Alert>
      )}
      {mode === "camera" && (
        <Box>
          {!preview && (
            <Box sx={{ borderRadius: 2, overflow: "hidden", mb: 2 }}>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                videoConstraints={{ facingMode: "user" }}
              />
            </Box>
          )}
          {!preview && (
            <Button variant="contained" fullWidth onClick={capturePhoto}>
              Capture Photo
            </Button>
          )}
        </Box>
      )}
      {mode === "upload" && (
        <Box>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
          <Button
            variant="outlined"
            fullWidth
            onClick={() => fileRef.current?.click()}
          >
            Choose Photo
          </Button>
        </Box>
      )}
      {preview && (
        <Box mt={3}>
          <Typography variant="body2" mb={1}>
            Preview:
          </Typography>
          <Avatar
            src={preview}
            sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
          />
          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <Button variant="outlined" onClick={() => setPreview(null)}>
              Retake
            </Button>
            <Button
              variant="contained"
              disabled={uploading}
              onClick={handleUpload}
            >
              {uploading ? "Uploading..." : "Save Photo"}
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
