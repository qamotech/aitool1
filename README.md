# 🧠🧰 AI Tool Workshop

**React AI-workshop app with learning and gallery views, text-tool workflows, photo organization, and server-side Gemini generation and vision routes.**

🏷️ Maintained in [qamotech/aitool1](https://github.com/qamotech/aitool1) · 🌐 Public repository

## ✨ What is here

- 📚 Home, learning, gallery, settings, and effects views.
- 📝 Tool ideas for notes, refactoring, stories, translation, and UI generation.
- 🖼️ Organize view and server vision endpoint.
- 🔌 Express routes for Gemini text and image requests.

## 🧭 Try the project

Install dependencies, configure GEMINI_API_KEY in a local .env file read by server.ts, start the development server, and try a non-sensitive sample prompt.

## 🚀 Local setup

```sh
git clone https://github.com/qamotech/aitool1.git
cd aitool1
```

Use Node.js and npm compatible with the versions in `package.json`. Install dependencies locally, then launch the declared development command:

```sh
npm install
npm run dev
```

Open the address printed by the development server. The manifest is the source of truth for commands:

| Command | Declared operation |
|---|---|
| `npm run dev` | `tsx server.ts` |
| `npm run build` | `vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs` |
| `npm run start` | `node dist/server.cjs` |
| `npm run preview` | `vite preview` |
| `npm run clean` | `rm -rf dist` |
| `npm run lint` | `tsc --noEmit` |
| `npm run deploy` | `gh-pages -d dist` |

Install/build scripts can execute code. Inspect project configuration and keep secrets in local configuration excluded from Git. No dependency installation or application build was performed for this documentation update.

## 🗂️ Source map

- 📄 [`index.html`](index.html)
- 📄 [`metadata.json`](metadata.json)
- 📄 [`package.json`](package.json)
- 📄 [`server.ts`](server.ts)
- 📄 [`tsconfig.json`](tsconfig.json)
- 📄 [`vite.config.ts`](vite.config.ts)
- 📄 [`src`](src) — source directory
- 📄 [`public`](public) — source directory

## ⚙️ Configuration & data

Keep API keys outside Git. Root package metadata still identifies aiws, but this repository is aitool1. The inherited README mentions .env.local; the current server uses dotenv.config(), so inspect configuration rather than assuming that filename is loaded. Static Pages hosting does not provide the Express routes.

Keep credentials, private exports, customer records, and personal information out of commits and screenshots. A local browser demo is not evidence of account security, reliable persistence, or connected external services. Preserve exports before changing storage keys or resetting an application.

## 🧪 Verification checklist

- 🔎 Confirm the entry file and asset paths above exist in your checkout.
- ▶️ Start the documented runtime and inspect browser or terminal errors.
- 🧭 Exercise the project-specific workflow described above using sample data.
- 📱 Check narrow and wide layouts when the project has a browser interface.
- 💾 Verify save/export and recovery behavior before trusting important work to it.
- 📝 Record the exact command, browser, operating system, and outcome of your checks.

This guide was prepared from repository files and manifests. It does not claim a fresh build, deployment, security audit, or full functional test of this project.

## 🤝 Contributions & useful reports

Keep changes focused and explain the user-visible result. Preserve existing assets and configuration unless a change requires updating them. Include reproduction steps, expected and actual behavior, and relevant screenshots with personal information removed. For UI work, include the viewport and browser; for runtime issues, include the command and error text.

## 🛠️ Maintenance priorities

- 📚 Keep this guide aligned with implemented behavior and current entry points.
- 🧪 Add or maintain checks for the core workflow before expanding features.
- ♿ Review labels, keyboard navigation, contrast, and responsive layout.
- 📦 Document external services, asset rights, and deployment prerequisites.

## 📜 Licensing & attribution

This documentation update does not grant a new software or asset license. Consult existing license files, source headers, package metadata, and original asset terms; resolve inconsistencies with the owner before redistribution. Third-party names and resources retain their own terms.

---

## 📚 Preserved earlier documentation

The material below is retained verbatim for history and project-specific context. Template instructions and older claims may differ from the source inventory above.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/f7c3b191-0b5e-43a6-8e15-d4a318d855ae

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
