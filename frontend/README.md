# Live Edition

https://chat-room-io.netlify.app/

# Available functionalities

- Login
- Messages
- Link Preview

# How it works

## Socket.IO Server

The front-end was published on Netlify, the backend on Heroku, currently the front is using heroku version, so in order to make changes on server you need to make the change and push to the `main` branch, so it will automatic deploy to heroku and netlify at the same time.

## Auth System

We store the email using nextjs iron session, saving it in a cookie.

# Getting Started

First, install npm modules:

```bash
npm install
# or
yarn
```

And start the development server:

```bash
npm run dev
# or
yarn dev
```

# Future Improvements

- Tests (integration, unit...)
- Private chat messages
- User Profile
- Name for user object so can mention it with @
- Better performance for socket server (implement rooms)
- Prevent weird characters on messages
- Increase security preventing script injection
- Fix weird bug with tailwind that makes text-color not work for link after build

# Cool Ideas

- Maybe login with MetaMask
- Send tokens and NFTs through chat
