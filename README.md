# ETGraph Site

[![Deploy](https://github.com/ETGraph/site/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/ETGraph/site/actions/workflows/deploy.yml)

## Development

Prerequisites:

- Node.js 18+
- pnpm
- Deno 1.36+

Steps:

- Create `.env` file (see [`.env.example`](.env.example))
  - Generate 256-bit JWT secret with `openssl rand -hex 32`
- `pnpm install`
- `pnpm run dev`

## Deployment

- Create a Deno Deploy project, link it to the GitHub repository
- Configure the required environment variables in GitHub repository settings (in
  the "Actions secrets and variables" tab)
- Configure the Deno Deploy project name in
  [`deploy.yml`](.github/workflows/deploy.yml)
- Push to the `master` branch to trigger the deployment
- Configure secret environment variables in the Deno Deploy project settings
  (still investigating why this step is needed)

## References

- [Jumbotron background effect](https://codepen.io/chris22smith/pen/RZogMa)
