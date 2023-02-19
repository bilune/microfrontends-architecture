# Microfrontends architecture

## Context and background

### Vertical slicing

### Horizontal slicing

## Development

### Before you start
- /etc/hosts setup
- Vercel deployment

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
