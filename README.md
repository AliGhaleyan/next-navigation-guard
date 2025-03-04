# Navigation Guard Hook for Next.js

## Overview

`useNavigationGuard` is a custom React hook designed for Next.js applications that need to prevent accidental navigation away from a page. It provides a way to intercept navigation events and prompt users before they leave an important page.

## Features

- Prevents accidental navigation using `beforeunload` events.
- Supports manual confirmation of navigation actions.
- Provides `accept`, `reject`, and `disable` methods for handling navigation prompts.
- Integrates seamlessly with Next.js and React applications.

## Installation

Install the package using npm or yarn:

```sh
npm install nextnav-guard
```

or

```sh
yarn add nextnav-guard
```

## Usage

### 1. Wrap Your Application with `NavigationGuardProvider`

Ensure your application is wrapped in a context provider to manage navigation guards.

```tsx
import { NavigationGuardProvider } from "nextnav-guard";

function MyApp({ Component, pageProps }) {
  return (
    <NavigationGuardProvider>
      <Component {...pageProps} />
    </NavigationGuardProvider>
  );
}

export default MyApp;
```

### 2. Use the `useNavigationGuard` Hook in a Component

You can use the `useNavigationGuard` hook in any component where you want to prevent accidental navigation.

```tsx
import { useNavigationGuard } from "nextnav-guard";
import { useState } from "react";

const FormPage = () => {
  const [formDirty, setFormDirty] = useState(false);
  const { active, accept, reject, disable } = useNavigationGuard(formDirty);

  return (
    <div>
      <h1>Protected Form</h1>
      <input
        type="text"
        onChange={() => setFormDirty(true)}
        placeholder="Type something..."
      />
      {active && (
        <div>
          <p>Are you sure you want to leave?</p>
          <button onClick={accept}>Yes</button>
          <button onClick={reject}>No</button>
        </div>
      )}
      <button onClick={disable}>Disable Guard</button>
    </div>
  );
};

export default FormPage;
```

## API

### `useNavigationGuard(enabled?: boolean)`

#### Parameters

- `enabled` *(boolean, optional)*: Enables or disables the navigation guard. Default is `false`.

#### Returns

- `active` *(boolean)*: Indicates whether a navigation confirmation is currently pending.
- `accept` *(function)*: Allows navigation to proceed.
- `reject` *(function)*: Prevents navigation.
- `disable` *(function)*: Completely disables the navigation guard.

## License

MIT License

