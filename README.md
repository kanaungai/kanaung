**Welcome to your Base44 project**

**About**

View and Edit  your app on [Base44.com](http://Base44.com) 

This project contains everything you need to run your app locally.

**Edit the code in your local development environment**

Any change pushed to the repo will also be reflected in the Base44 Builder.

**Prerequisites:** 

1. Clone the repository using the project's Git URL 
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create an `.env.local` file and set the right environment variables

```
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=your_backend_url
VITE_BASE44_FUNCTIONS_VERSION=optional_functions_version

e.g.
VITE_BASE44_APP_ID=cbef744a8545c389ef439ea6
VITE_BASE44_APP_BASE_URL=https://my-to-do-list-81bfaad7.base44.app
```

Run the app: `npm run dev`

## DeepSeek showroom assistant setup

This repo now sends demo chat requests to a Base44 backend function named `showroomAssistantChat`.

- Frontend public config belongs in `.env.local` only:
  - `VITE_BASE44_APP_ID`
  - `VITE_BASE44_APP_BASE_URL`
  - `VITE_BASE44_FUNCTIONS_VERSION` if your Base44 environment needs it
- The DeepSeek secret must **not** go into `.env.local`, `import.meta.env`, or any frontend file.
- Store `DEEPSEEK_API_KEY` in Base44 backend secrets/config and deploy the server-side function there.
- The Base44 app function source is included at `functions/showroomAssistantChat.ts`.
- A tracked template for local env values is included at `env.example`.

If the backend function is missing or fails, the UI falls back to the original local demo reply generator and shows a warning banner.

**Publish your changes**

Open [Base44.com](http://Base44.com) and click on Publish.

**Docs & Support**

Documentation: [https://docs.base44.com/Integrations/Using-GitHub](https://docs.base44.com/Integrations/Using-GitHub)

Support: [https://app.base44.com/support](https://app.base44.com/support)

nk
dsf
