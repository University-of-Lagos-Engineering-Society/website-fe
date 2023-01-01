import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
  res.send('Hello World');
  console.log("sent message");
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})

