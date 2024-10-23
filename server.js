// server.js
import cookieParser from 'cookie-parser';
import express from 'express'
import rootRouter from './src/routes/root.router.js';
import cors from 'cors'

const app = express()
const port = 8000

app.use(express.json());
app.use(express.static("."));

// Create middleware allowing FE to call API to BE
app.use(cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(rootRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})