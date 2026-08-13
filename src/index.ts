import { Agent, Runner } from "./app/agent.js";


async function inti() {
    const options = {
        name: 'Coding-agent',
        instructions: 'You are an expert problem solver'
    }

    const agent = new Agent(options);

    const agentRun = new Runner(agent, 'Hey what are you doing');
    await agentRun.run();
}

inti();