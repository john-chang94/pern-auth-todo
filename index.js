const express = require('express');
const app = express();
const cors = require('cors');

// allow local 5000 local 3000 to interact
app.use(cors());
// allows access to req.body
app.use(express.json())

app.use('/dashboard', require('./routes/dashboardRoutes'));
app.use('/auth', require('./routes/authRoutes'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));