# Microfrontends architecture

## Context and background

### Vertical slicing
In microfrontends architectures, splitting vertically would assign a specific view, or group of views, to a team allowing that team mastering a specific area of the application. [¹](https://lucamezzalira.medium.com/micro-frontends-decisions-framework-ebcd22256513)

The proposed architecture achieves vertical slicing through [Next.js rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites).

> Rewrites act as a URL proxy and mask the destination path, making it appear the user hasn't changed their location on the site. In contrast, redirects will reroute to a new page and show the URL changes.

The host app is responsible for serving the child apps. In host app's `next.config.js` file, you have to declare a list of paths and hosts like so:

```js
// host/next.config.js
const { hostPlugin } = require("next-federation");

const withHostPlugin = hostPlugin({
  childApps: [
    {
      path: "/mf-1",
      host: "https://mf-1.vercel.app",
    },
  ],
});
```

Then, in the child app, you have to setup the `basePath` attribute like so:
```js
// mf-1/next.config.js
const { mfePlugin } = require("next-federation");

const withMfePlugin = mfePlugin({
  basePath: "/mf-1",
});
```

### Common areas
Despite the fact that each portion of the application is owned by a different team, there are common areas in the hole app that need to be shared. Module Federation allows us to achieve that by exposing some methods or components and allowing child apps to consume them.
This example uses [@module-federation/nextjs-mf](https://github.com/module-federation/universe/tree/main/packages/nextjs-mf).
To expose some parts of the host app, you can set it up like this.

```js
// host/next.config.js
const { hostPlugin } = require("next-federation");

const withHostPlugin = hostPlugin({
  exposes: {
    "./layout": "./components/layout.tsx",
    "./useUser": "./utils/useUser.ts",
  },
});
```

Then, in child apps you just need to declare the URL of the host app (running locally or remotely):
```js
// mf-1/next.config.js
const withMfePlugin = mfePlugin({
  hostUrl: "https://mfe.vercel.app",
});
```

## Development

### Before you start
- /etc/hosts setup (optional)
- Vercel deployment
- Auth0 setup: follow [@auth0/nextjs-auth](https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#basic-setup) instructions.

### Core development
If you are responsible to maintain the common parts of the application such as authentication or layout, you will need to locally run the host app. You can also start one or multiple child apps or just load them remotely. To start developing, run the following commands:
```bash
yarn install
yarn dev
```

This will start the host and the child app locally. You can navigate through http://localhost:3000 or the DNS you set up in `/etc/hosts`.

### Product development
You can run the commands above and just start coding too!

But if you are a product developer you probably don't care that much about the common parts of the app. You just want to log into the app, go to your own path and code. To do that, you need to setup the URL of the remote deployed app in your .env file
```bash
# .env file
HOST_URL='https://mf-host-chi.vercel.app'
```

then run your app with `yarn dev`. And that's it. You are only running your microfrontend locally and using the remote host app to authenticate and load common components shared through Module Federation.

## Deployment

## Sources
- [_Micro-frontends decisions framework_](https://lucamezzalira.medium.com/micro-frontends-decisions-framework-ebcd22256513) by Luca Mezzalira.
