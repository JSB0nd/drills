const express = require('express');
const fs = require('fs');
const fs_promises = fs.promises;
const path = require('path');
const readJsonFiles = require('./read');

const app = express();
const PORT = process.env.PORT || 3037;

app.get('/api/v1/json', (req, res) => {

  const { filename, folder, chapter } = req.query;

  const filePath = path.join(`${__dirname}/data/${chapter}/${folder}`, filename);

  if (!filename || !folder) {
    return res.status(400).send("Параметры 'filename', 'chapter' и 'folder' обязательны.");
  }

  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Файл не найден!' });
    }

    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const parsedData = JSON.parse(data); 
      res.json(parsedData); 
    } catch (parseError) {
      return res.status(500).json({ error: 'Ошибка разбора JSON!' });
    }
  });
});

app.get('/api/v1/svg', (req, res) => {

  const { filename, folder, chapter } = req.query;

  const imagePath = path.join(`${__dirname}/data/${chapter}/${folder}`, filename);

  if (!filename || !folder) {
    return res.status(400).send("Параметры 'filename', 'chapter' и 'folder' обязательны.");
  }

  if (!filename.endsWith('.svg')) {
    return res.status(400).send('Только файлы .svg поддерживаются.');
  }

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      return res.status(404).send('Файл не найден.');
    }
    res.type('image/svg+xml');
    res.send(data);
  });
});

app.get('/api/v1/drills/:chapterId/:drillId', async (req, res) => {
  const { chapterId, drillId } = req.params;

  try {
    const filePath = path.join(__dirname, 'data', chapterId, `${drillId}.json`);
   
    await fs_promises.access(filePath);

    const data = await fs_promises.readFile(filePath, 'utf8');

    return res.status(200).json(JSON.parse(data));
  } catch (err) {
    if (err.code === 'ENOENT') {
      return res.status(404).send({ error: 'Файл не найден' });
    }
    console.error(err);
    return res.status(500).send({ error: 'Ошибка сервера' });
  }
});

app.get('/api/v1/drills/file', (req, res) => {
  const { filename, folder, chapter } = req.query;

  const fullPath = path.join(`${__dirname}/data/${chapter}/${folder}`, filename);

  if (!filename || !folder) {
    return res.status(400).send("Параметры 'filename', 'chapter' и 'folder' обязательны.");
  }

  fs.access(fullPath, fs.constants.R_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Файл не найден.' });
    }

    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${filename}`
    });

    try {

      const readStream = fs.createReadStream(fullPath);
      readStream.pipe(res);

    } catch (error) {
      return res.status(500).json({ error: 'Ошибка при чтении файла.' });
    }
  });
});

app.get('/api/v1/drills', (req, res) => {
  return res.status(200).json(readJsonFiles('data'));
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});