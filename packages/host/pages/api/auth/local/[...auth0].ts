import {
  handleAuth,
  handleLogin,
  handleCallback,
  handleLogout,
} from "@auth0/nextjs-auth0";

const HOST = process.env.AUTH0_LOCAL_HOST;

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res, {
      authorizationParams: {
        redirect_uri: `${HOST}/api/auth/callback`,
      },
    });
  },
  async callback(req, res) {
    await handleCallback(req, res, {
      redirectUri: `${HOST}/api/auth/callback`,
    });
  },
  async logout(req, res) {
    await handleLogout(req, res, {
      returnTo: `${HOST}/`,
    });
  },
});
