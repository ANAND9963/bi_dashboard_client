import React from "react";
import AppBarComponent from "./AppBarComponent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const Profile = () => {
  // Sample user data (replace with dynamic data from API or state)
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    address: "123 Main Street, City, Country",
  };

  // State for the dialog and form data
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  // Handle update button click
  const handleUpdateProfile = () => {
    setOpen(true); // Open the form dialog
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    console.log('Submitting updated profile:', formData);
    setOpen(false); // Close the dialog after submission
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      {/* App Bar Component */}
      <AppBarComponent user={user} />

      {/* Profile Information */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="h6">Name: {user.firstName} {user.lastName}</Typography>
        <Typography variant="h6">Email: {user.email}</Typography>
        <Typography variant="h6">Phone: {user.phone}</Typography>
        <Typography variant="h6">Address: {user.address}</Typography>

        {/* Update Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleUpdateProfile}
        >
          Update Profile
        </Button>
      </Box>

      {/* Dialog for Updating Profile */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Profile;
