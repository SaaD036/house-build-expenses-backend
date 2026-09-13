import { execSync } from 'child_process';

const isWindows = process.platform === 'win32';

function createCommand(dir, script) {
    if (isWindows) {
        return `cd ${dir} ; if ($?) { ${script} }`;
    } else {
        return `cd ${dir} && ${script}`;
    }
}

const tasks = [
    {
        name: 'Backend',
        color: 'green',
        icon: 'server',
        command: createCommand('backend', 'npm run dev'),
    },
    {
        name: 'Frontend',
        color: 'blue',
        icon: 'browser',
        command: createCommand('frontend', 'npm start'),
    },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function launchTerminals() {
    for (const task of tasks) {
        console.log(`Launching terminal: ${task.name}...`);

        const programParams = {
            name: task.name,
            color: task.color,
            icon: task.icon,
            command: task.command,
        };

        const configAsString = JSON.stringify(programParams);
        const encodedConfig = btoa(encodeURIComponent(configAsString));
        const vscodeUri = `vscode://open.in-terminal?config=${encodedConfig}&encoded=1`;

        try {
            if (process.platform === 'darwin') {
                execSync(`open "${vscodeUri}"`);
            } else if (isWindows) {
                execSync(`start "" "${vscodeUri}"`);
            } else {
                execSync(`xdg-open "${vscodeUri}"`);
            }
        } catch (error) {
            console.error(`Failed to launch ${task.name}:`, error.message);
        }

        await sleep(250);
    }

    console.log('All workspaces spawned. Closing this setup terminal now...');
    await sleep(100);
    process.exit(0);
}

launchTerminals();
