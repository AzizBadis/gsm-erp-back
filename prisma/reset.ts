import { spawnSync } from 'node:child_process';

const confirmation = process.env.CONFIRM_DB_RESET;

if (confirmation !== 'RESET') {
  console.error(
    'Database reset cancelled. This command deletes all database data before running migrations.\n' +
      'Run it with CONFIRM_DB_RESET=RESET.',
  );
  process.exit(1);
}

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const result = spawnSync(npx, ['prisma', 'migrate', 'reset', '--force', '--skip-seed'], {
  stdio: 'inherit',
  env: process.env,
});

if (result.error) {
  console.error('Unable to reset the database:', result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
