import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5001/api/auth/profile', {
        headers: { Authorization: token },
      });
      setProfile(data);
      setNewName(data.name);
      setNewEmail(data.email);
    };
    fetchProfile();
  }, []);

  const updateProfile = async () => {
    const token = localStorage.getItem('token');
    await axios.put(
      'http://localhost:5001/api/auth/profile',
      { name: newName, email: newEmail, password: newPassword },
      { headers: { Authorization: token } }
    );
    setProfile({ name: newName, email: newEmail });
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button onClick={updateProfile}>Update Profile</button>
    </div>
  );
}

export default Profile;
