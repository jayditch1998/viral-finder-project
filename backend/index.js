const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const viralContentRoutes = require('./routes/viralContentRoutes');

// connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Your connencted to MongoDB'))
  .catch((error) => console.log(error));

app.get('/', (request, response) => {
  response.send('Viral Finder API');
});

app.use('/api/viral-content', viralContentRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

