# Contributing

Thank you for your interest in contributing to the **memoria**! Feel free to open issues or PRs.

## Prerequisites

- [Node.js](https://nodejs.org) (version >=20)
- [pnpm](https://pnpm.io)

Android:

- [Java 21](https://adoptium.net/de/temurin/releases?version=21)
- [Android Studio](https://developer.android.com/studio)

iOS:

- [Xcode](https://developer.apple.com/xcode)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/xp4u1/memoria
   cd memoria
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

## Development

### Common Commands

```bash
pnpm install                # Install dependencies
pnpm dev                    # Start live server for development
pnpm lint                   # Run ESLint
pnpm format                 # Format code with Prettier
pnpm localize               # Generate/update language files
pnpm build                  # Build the web project (for Capacitor)
pnpm exec cap sync          # Copy web build to native directories
pnpm test                   # Run unit tests
pnpm test.e2e               # Run Cypress tests
pnpm exec cap open android  # Open Android Studio
pnpm exec cap open ios      # Open Xcode
```

### Running the Server

1. Start the development server (`pnpm dev`)
2. Open <http://localhost:5173> in your browser

### Translation

Example component usage:

```tsx
import { useTranslation } from "react-i18next";

const Component: React.FC = () => {
  const { t } = useTranslation();
  return <p>{t("Write your text in here")}</p>;
};
```

After adding or changing translations run `pnpm localize`. This will extract the strings and update the files in the `./locales` directory (e.g. `locales/de/translation.json`).

## Code Style

- Code is formatted with Prettier (run `pnpm format` before committing)
- Linting is enforced with ESLint (run `pnpm lint` to check)

## Architecture Overview

**memoria** is a hybrid mobile journaling application built with React and Ionic Framework, using Capacitor for native Android and iOS deployment.

### Project Structure

```
memoria/
├── src/                    # Application source code
│   ├── components/         # Reusable UI components
│   ├── data/               # Data layer (entries, preferences, sync, remote)
│   ├── pages/              # Page components
│   ├── styles/             # Global SCSS styles
│   └── theme/              # Ionic theme variables
├── android/                # Native Android project (Capacitor)
├── ios/                    # Native iOS project (Capacitor)
├── database/               # Example CouchDB configuration for sync server
├── locales/                # Translation files
├── cypress/                # End-to-end tests
├── public/                 # Static assets and PWA icons
└── scripts/                # Build/release utilities
```

### Key Technologies

| Layer             | Technology                                               |
| ----------------- | -------------------------------------------------------- |
| **UI Framework**  | [Ionic Framework](https://ionicframework.com) with React |
| **Frontend**      | React                                                    |
| **Build Tool**    | Vite                                                     |
| **Native Bridge** | Capacitor                                                |
| **Database**      | Local PouchDB (client) with CouchDB sync support         |
| **Styling**       | SCSS with Ionic components                               |
| **i18n**          | i18next + react-i18next                                  |
| **Testing**       | Vitest (unit), Cypress (e2e)                             |

### Data Flow

```
┌──────────────────────────────────────────────────────────────┐
│                          UI Layer                            │
│               (Ionic React Components / Pages)               │
└─────────────────────────────┬────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────┐
│                         Data Layer                           │
│  src/data/                                                   │
│  ├── preferences.ts  → User settings (Capacitor Preferences) │
│  ├── remote.ts       → Remote database configuration         │
│  └── sync.ts         → PouchDB ↔ CouchDB synchronization     │
└─────────────────────────────┬────────────────────────────────┘
                              │
┌─────────────────────────────▼────────────────────────────────┐
│                       Storage Layer                          │
│      ┌──────────────┐              ┌──────────────────┐      │
│      │   PouchDB    │◄─── sync ───►│  CouchDB Server  │      │
│      │   (local)    │              │    (optional)    │      │
│      └──────────────┘              └──────────────────┘      │
└──────────────────────────────────────────────────────────────┘
```

## Submitting Changes

1. Fork the repository and create a branch for your changes
2. Make your changes and ensure tests pass and native builds work
3. Commit early and often: Use small, focused commits that make reviewing easier
4. Use [Conventional Commits](https://www.conventionalcommits.org) for commit messages. Examples:
   - `feat: add search functionality for journal entries`
   - `docs: update installation instructions`
   - `fix(sync): handle CouchDB connection timeout`
5. Run `pnpm lint` and `pnpm format` to ensure code style compliance
6. Rebase your branch onto the branch you want to merge into
7. Submit a pull request with a clear description of your changes

For bug fixes, please include a test case that demonstrates the fix when possible.
