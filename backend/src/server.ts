import express, { type Application, type Request, type Response, type NextFunction } from 'express';
import chalk from 'chalk';
import cors from 'cors';
import { toNodeHandler, fromNodeHeaders } from 'better-auth/node';
import { auth } from './lib/auth.js';

const app: Application = express();
const port = process.env.PORT ?? 3000;

const allowlist = ['http://localhost:5173'];
const corsOptions = {
  credentials: true,
  origin: allowlist,
};
app.use(cors(corsOptions));

export async function authenticatedUser(req: Request, res: Response, next: NextFunction) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  console.log({ session });
  if (!session?.user) {
    res.status(403);
    // res.redirect('/api/auth/signin');
  } else {
    next();
  }
}

app.set('trust proxy', true);

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'Server healthy' });
});

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.get('/protected', authenticatedUser, (req: Request, res: Response) => {
  res.json(['This is protected Information']);
});

app.listen(port, () => console.log(chalk.bgGreen(` Server listening on port ${port} `)));
