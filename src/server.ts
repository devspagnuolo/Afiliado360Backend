import express from 'express';
import registerRoutes from './routes/register';

const app = express();

app.use(express.json());
app.use('/api', registerRoutes); // acessa /api/register

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
