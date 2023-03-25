const app = require('./app');
const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '../.env'),
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
