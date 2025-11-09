const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const db = new Map();

app.use(bodyParser());
const router = new Router();

const PORT = 3000;

router.post('/users', (ctx) => {
  const {name, email} = ctx.request.body;
  if (!name || !email) {
    ctx.status = 400;
    ctx.body = {error: 'Name and email are required'};
    return;
  }

  const id = idCounter++;
  const user = {id, name, email};
  db.set(id, user);
  ctx.status = 201;
  ctx.body = user;
});

router.get('/users', (ctx) => {
  ctx.body = Array.from(db.values());
});

// Apply routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
