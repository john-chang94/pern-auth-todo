const express = require('express');
const app = express();
const cors = require('cors');
// do not need to install 'path'
const path = require('path');

// allow local 5000 local 3000 to interact
app.use(cors());
// allows access to req.body
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    // __dirname is the location of the build folder
    app.use(express.static(path.join(__dirname, 'client/build')))
}

app.use('/dashboard', require('./routes/dashboardRoutes'));
app.use('/auth', require('./routes/authRoutes'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));