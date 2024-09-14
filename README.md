
```bash
git clone https://github.com/priyankasoni930/LinkShrink.git
```
```bash
cd LinkShrink
```

<h3>Fill the required fields inside the .env before starting the server </h3>

```bash
bun install
```
```bash
bun migrate:dev
```
```bash
bun dev
```

This will start the development server  at http://localhost:3000/

### Deploy to production

```bash
bun build:production
```

### Run prisma studio

```bash
bun prisma:studio
```


