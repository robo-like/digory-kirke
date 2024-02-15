# digory-kirke
`digory-kirke` is a TypeScript-based starter template designed to streamline the process of publishing static content via Cloudflare Workers. Inspired by the essence of exploration and creation in C.S. Lewis's character, Digory Kirke, this package offers a seamless way to use Cloudflare Workers as a CMS tool, transforming any URL into a static, globally-distributed site with ease.

# Features
- **Simple Setup**: Get your static content deployed in minutes with a straightforward setup process.
- **TypeScript Support**: Leverage the power of TypeScript for safer and more reliable code.
- **Cloudflare Integration**: Designed to work seamlessly with Cloudflare Workers, ensuring fast, secure, and scalable deployments.
- **Customizable**: Flexible configuration options to meet the needs of various content types and deployment strategies.

# Getting Started
## Prerequisites
- Node.js installed on your system
- A Cloudflare account with Workers enabled

## Installation
Install digory-kirke using your favorite package manager:

```sh
yarn add digory-kirke
```

## Usage
**Initialize your project**: Start by creating a new project folder and initializing it with npm or yarn.

```sh
mkdir my-static-site && cd my-static-site
npm init -y
```

**Install digory-kirke**:

```sh
npm install digory-kirke
```

**Configure your project**: Create a digory-kirke.config.ts in your project root to configure your static content source and Cloudflare Worker settings.

```typescript
// digory-kirke.config.ts
export default {
    sourceUrl: "YOUR_CONTENT_SOURCE_URL",
    cloudflareAccountId: "YOUR_CLOUDFLARE_ACCOUNT_ID",
    cloudflareApiToken: "YOUR_CLOUDFLARE_API_TOKEN",
    // Additional configurations...
};
```

**Deploy**: Run the following command to deploy your static content to Cloudflare Workers.
```sh
npx digory-kirke deploy
```

## Configuration Options
sourceUrl: The URL of the static content you wish to deploy.
cloudflareAccountId: Your Cloudflare account ID.
cloudflareApiToken: Your Cloudflare API token.

## Contributing
Contributions are what make the open-source community such a fantastic place to learn, inspire, and create. Any contributions you make are greatly appreciated.

## License
Distributed under the MIT License. See LICENSE for more information.

## Acknowledgements
Inspired by the character Digory Kirke from C.S. Lewis's Chronicles of Narnia.
