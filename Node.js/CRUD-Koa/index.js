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

// Get users
router.get('/users', (ctx) => {
  ctx.body = Array.from(db.values());
});

router.delete('/users/:id', (ctx) => {
  const id = parseInt(ctx.params.id);
  if (!db.has(id)) {
    ctx.status = 404;
    ctx.body = {error: 'User not found'};
    return;
  }

  db.delete(id);
  ctx.status = 204;
});

//Update user info
router.put('/users/:id', (ctx) => {
  const id = parseInt(ctx.params.id);
  const existingUser = db.get(id);
  if (!existingUser) {
    ctx.status = 404;
    ctx.body = {error: 'User not found'};
    return;
  }
  const {name, email} = ctx.request.body;
  const updatedUser = {...existing, name, email};
  db.set(id, updatedUser);
  ctx.body = updatedUser;
});

// Apply routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
