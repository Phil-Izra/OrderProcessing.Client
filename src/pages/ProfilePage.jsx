import { Box, Paper, Typography, Avatar, Divider } from "@mui/material";
import { useAuthContext } from "../auth/useAuthContext";
import PhotoUpload from "../components/PhotoUpload";
import { useState } from "react";
export default function ProfilePage() {
  const { user } = useAuthContext();
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  return (
    <Box maxWidth={600} mx="auto" mt={4}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        My Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box textAlign="center" mb={3}>
          <Avatar
            src={photoUrl}
            sx={{
              width: 100,
              height: 100,
              mx: "auto",
              mb: 1,
              bgcolor: "primary.main",
              fontSize: 40,
            }}
          >
            {user?.fullName?.[0]}
          </Avatar>
          <Typography variant="h6">{user?.fullName}</Typography>
          <Typography color="text.secondary">{user?.email}</Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" mb={2}>
          Update Profile Photo
        </Typography>
        <PhotoUpload onSuccess={setPhotoUrl} />
      </Paper>
    </Box>
  );
}
