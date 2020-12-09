import api from './api';
const HOST = 'localhost';
const PORT = 9000;

api.listen(PORT, () =>
  console.log(`Server listening at ${HOST}:${PORT} \u{1F680}`),
);
