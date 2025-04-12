# CarpenterJS Action Client

Type-safe library for handling server actions in CarpenterJS applications.

## Installation

```bash
npm install @carpenter/actions
# or
yarn add @carpenter/actions
```

## Setup

First, you need to create a type declaration file to define your action types:

```typescript
// types/actions.d.ts
import { ActionTypeMap } from "@carpenter-js/actions";

declare module "@carpenter-js/actions" {
  interface ActionTypeMap {
    "contact/submit": {
      input: {
        name: string;
        email: string;
        message: string;
      };
      output: {
        id: string;
        timestamp: string;
      };
    };
    // Add more action types as needed
  }
}
```

## Usage

### Basic Usage

```tsx
import { createAction } from "@carpenter-js/actions";

// Create an action
const submitContact = createAction("contact/submit");

// Use it in a component
function ContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await submitContact({
      name: "John Doe",
      email: "john@example.com",
      message: "Hello world!",
    });

    if (result.status === "success") {
      console.log("Success!", result.result);
    } else {
      console.error("Error:", result.error);
    }
  };

  // rest of component...
}
```

### Using Hooks

```tsx
import { useAction, useActionWithState } from "@carpenter-js/actions";
import { useState } from "react";

function ContactFormWithHooks() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Simple hook version
  const submitContact = useAction("contact/submit");

  // With loading and error state
  const [submitContactWithState, isLoading, error] =
    useActionWithState("contact/submit");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await submitContactWithState(formData);

    if (result.status === "success") {
      // Handle success
    }
    // No need to handle error as it's already in the error state
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {isLoading && <p>Submitting...</p>}
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
```

### With Options

```tsx
// Set custom headers or timeout
const result = await submitContact(data, {
  headers: {
    Authorization: "Bearer token123",
  },
  timeout: 5000, // 5 seconds
});

// Or with default options
const submitWithAuth = useAction("contact/submit", {
  headers: { Authorization: "Bearer token123" },
});
```

## API

### `createAction(actionPath)`

Creates a function that calls the server action at the specified path.

### `useAction(actionPath, defaultOptions?)`

React hook that returns a function to call the server action, with optional default options.

### `useActionWithState(actionPath, defaultOptions?)`

React hook that returns a tuple of `[actionFunction, isLoading, error]`.

## TypeScript Support

This library is written in TypeScript and provides full type safety when used with TypeScript.

## License

MIT
