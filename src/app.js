const express = require("express"); //веб-фреймворк маршрутизации и промежуточной обработки с минимальной собственной функциональностью
const dotenv = require("dotenv"); // анализирует файлы .env ,чтобы сделать переменные окружения, хранящиеся в них
const bodyParser = require("body-parser"); //анализирует часть тела входящего запроса HTTP и облегчает извлечение из него различных частей
const cors = require("./middleware/cors"); //CORS позволяет серверам указать, с каких доменов разрешено получать данные, обеспечивая безопасность и контроль доступа.
const mongoose = require("mongoose"); //средство моделирование объектов базы данных MongoDB, предназначенное для асинхронной работы
const userRouter = require("./routers/users");
const bookRouter = require("./routers/books");
// Если при обработке запросов приходится выполнять какое-то действие,
//  например логирование и/или проверку авторизации,
//  то такие проверки можно вынести в функции, которые называются middleware.
const logOriginalUrlMiddleware = require("./middleware/logOriginalUrlMiddleware");

dotenv.config();

const { PORT, API_URL, MONGO_URL } = process.env;

const app = express();

app.use(cors);
app.use("/", logOriginalUrlMiddleware);

app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/books", bookRouter);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Сервер запущен по адресу ${API_URL}:${PORT}`);
    });
  })
  .catch((error) => handleError(error));
