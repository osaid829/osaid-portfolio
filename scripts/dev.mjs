import { spawn } from 'node:child_process';

// Accept the preview runner's conventional flags without changing frameworks.
const args = process.argv.slice(2).filter(arg => arg !== '--strictPort')
    .map(arg => arg === '--host' ? '--hostname' : arg);
if (!args.includes('--hostname')) args.push('--hostname', '0.0.0.0');
const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'dev', ...args], { stdio: 'inherit' });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', code => process.exit(code ?? 0));
