require('dotenv').config();

const { app, connectDB } = require("./app");


const PORT = process.env.PORT || 3001;


app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  
  await connectDB();
});


