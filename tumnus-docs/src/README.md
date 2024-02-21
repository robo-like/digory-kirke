# Welcome to Tumnus

## The Gateway to Event-Driven Clarity

In the vast, wild landscapes of event-driven architecture, where messages roam free and untamed, Tumnus emerges as the beacon of order, transforming chaos into harmony. Designed for developers who dare to harness the power of events without losing their sanity, Tumnus offers a robust open-source tool for managing event-driven messages and responses with grace and efficiency.

### Key Features

- **Signal Management:** Declare signals and let Tumnus manage the lifecycle of your `signal_messages` with states including `new`, `processing`, `complete`, and `error`.
- **Versatile Messaging:** Each message carries a `version` number along with an `unstructured payload`, accommodating the diverse needs of your event-driven applications.
- **Receiver Enlightenment:** `receiver_messages` mirror the structure of signals, ensuring a seamless duplication process and enabling precise message targeting.
- **Signals & Receivers:** Define signals with a `name`, `description`, and `version`. Link receivers through objectId references, each attuned to specific signals they're destined to handle.

### Getting Started

Embark on your journey with Tumnus by initializing it with a connection string to a MongoDB 4.2 (or higher) database, equipped with read and write access to all collections. Tumnus's magic begins with the `Splitter` worker, a diligent entity responsible for listening to new signal events and converting them into corresponding `Receiver_Messages`.

Ensure that your realm of signals and receivers is well-ordered; a receiver must never point to a nonexistent signal, as this breaks the sacred bond of event-driven clarity.

### Installation

```shell
npm install tumnus --save
```

### Quickstart

```typescript
import { Tumnus } from 'tumnus';
const tumnus = new Tumnus({ connectionString: 'your_mongo_connection_string' });

// Your journey begins...
```
