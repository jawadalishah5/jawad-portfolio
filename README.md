# Jawad Bukhari — portfolio

The home page is a chat about Jawad’s work and hiring fit. The portfolio is at `/portfolio`.

## Local development

```bash
npm install
```

Copy `.env.example` to `.env.local` if you don’t already have one, and set `OPENAI_API_KEY`. The app reads that file on each question, so a key already exported in the terminal does not override it.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The résumé download is `public/resume.pdf`.

Questions that are not about Jawad’s background, work, or a hiring fit are declined before any OpenAI call. `OPENAI_MODEL` defaults to `gpt-4o-mini`.
