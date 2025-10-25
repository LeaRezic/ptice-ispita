## Ptice ispita

Jednostavna stranica, lista ptica koju se može pretražiti i filtrirati.

Svaka ptica ima sliku, nazive, stranicu udžbenika, oznaku je li u ispitu izgled i/ili glasanje, i linkove na resurse: Bird Book, Birds of the World i Xeno Canto.

Svi podatci su statički: `src/data/birds.json`.

Automatski se pokreće build i deploy na github pages: [ptice-ispita](https://learezic.github.io/ptice-ispita/).

## Running the app

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can also run it on a custom port:

```bash
npm run dev -- -p 4000
```

To test on local network (useful for testing on other devices), run:

```bash
npm run dev:network
```

Open `http://{your-IP-address}:4000` to see the result.

To check your IP address, run:

```bash
# Most reliable for WiFi
ipconfig getifaddr en0

# Or for Ethernet
ipconfig getifaddr en1
```

## Next.js

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
