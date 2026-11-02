/**
 * Creates (or regenerates) the read-only API token the Next.js website uses,
 * and writes it into ../client/.env.local as STRAPI_API_TOKEN.
 * The token is never printed.
 *
 *   npm run website:token
 *
 * For production, create the token in the admin panel instead
 * (Settings → API Tokens → Create, type "Read-only", duration "Unlimited")
 * and set STRAPI_API_TOKEN in the website's hosting environment.
 */
const fs = require('node:fs');
const path = require('node:path');
const { compileStrapi, createStrapi } = require('@strapi/strapi');

const TOKEN_NAME = 'Next.js website';
const ENV_FILE = path.resolve(__dirname, '../../client/.env.local');

function upsertEnv(file, values) {
  const lines = fs.existsSync(file) ? fs.readFileSync(file, 'utf8').split('\n') : [];
  for (const [key, value] of Object.entries(values)) {
    const index = lines.findIndex((line) => line.startsWith(`${key}=`));
    if (index === -1) lines.push(`${key}=${value}`);
    else lines[index] = `${key}=${value}`;
  }
  fs.writeFileSync(file, `${lines.filter((line, i) => line || i < lines.length - 1).join('\n')}\n`);
}

async function main() {
  const app = await createStrapi(await compileStrapi()).load();
  try {
    const tokens = app.service('admin::api-token');
    const existing = await app.db.query('admin::api-token').findOne({ where: { name: TOKEN_NAME } });

    const { accessKey } = existing
      ? await tokens.regenerate(existing.id)
      : await tokens.create({
          name: TOKEN_NAME,
          description: 'Read-only access for the Next.js website (server-side only).',
          type: 'read-only',
          kind: 'content-api',
          lifespan: null,
        });

    upsertEnv(ENV_FILE, {
      STRAPI_URL: `http://localhost:${process.env.PORT || 1337}`,
      STRAPI_API_TOKEN: accessKey,
      REVALIDATE_SECRET: process.env.REVALIDATE_SECRET || '',
    });
    console.log(`${existing ? 'Regenerated' : 'Created'} "${TOKEN_NAME}" token → written to ${ENV_FILE}`);
  } finally {
    await app.destroy();
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
