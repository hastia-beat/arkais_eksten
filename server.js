const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.static('public')); // untuk file static

// Rute untuk mendapatkan data dari tabel `words`
app.get('/words', async (req, res) => {
  try {
    const words = await prisma.words.findMany();
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
