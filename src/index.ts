import { Agent } from "./app/agent.js";
import { Runner } from "./app/runner.js";
import type { ITool } from "./utils/typeUtils.js";

const getWeather = async (): Promise<string> => {
    return 'Hi'
}

async function inti() {
    const options = {
        name: 'Coding-agent',
        instructions: 'You are an expert problem solver'
    }

    const tool: ITool = {
        name: 'getWeatherTool',
        description: 'Tool to get the weather infomation',
        executor: getWeather
    }

    const agent = new Agent(options);
    agent.addTools(tool);

    const agentRun = new Runner(agent, 'Hey what are you doing');
    await agentRun.run();
}

inti();