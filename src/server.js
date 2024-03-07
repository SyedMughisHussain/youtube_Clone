import app from "./index.js";

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});