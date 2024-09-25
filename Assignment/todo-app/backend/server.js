const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todos', authenticateToken, todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
