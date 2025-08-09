import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import { User, type IUser } from './models/User.ts';
const app: Express = express();
const port = 3000;

app.use(express.json());

interface CustomRequest extends Request {
  startTime?: number;
}
//middleware
app.use((req: CustomRequest, res: Response, next: NextFunction) => {
  req.startTime = Date.now();
  next();
});
app.listen(port, () => {
  console.log(`first app listening on port ${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/user', async (req: Request, res: Response) => {
  try {
    const user: IUser[] = await User.find();
    res.json(user);
    res.json({});
  } catch (error) {
    res.status(400).json({ message: `Some error occured!` });
  }
});

//post route
interface User {
  name: string;
  age: number;
}

app.post('/user', (req: Request<{}, {}, User>, res: Response) => {
  const { name, age } = req.body;
  res.json({
    message: `User created with Name: ${name}, Age: ${age}`,
  });
});

//user based on ID

app.get('/user/:id', (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  res.json({
    message: `User with ID: ${id}`,
  });
});
