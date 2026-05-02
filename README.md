# Kanaung Website

React/Vite website for Kanaung with a Vercel API route for the showroom assistant demo.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Copy the env template:

```bash
cp env.example .env.local
```

3. Add the server-side DeepSeek key:

```bash
DEEPSEEK_API_KEY=your_deepseek_api_key
DEEPSEEK_MODEL=deepseek-chat
```

4. Run the frontend:

```bash
npm run dev
```

The Vite dev server only runs the frontend. The demo chat UI falls back to the local deterministic reply engine when `/api/showroom-assistant-chat` is not available.

## Vercel Deployment

Set `DEEPSEEK_API_KEY` in Vercel Project Settings > Environment Variables. `DEEPSEEK_MODEL` is optional and defaults to `deepseek-chat`.

The production demo calls the first-party API route at `api/showroom-assistant-chat.js`; no external builder runtime, SDK, plugin, auth layer, hosted media, or API rewrites are required.
