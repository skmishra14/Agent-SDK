import { Agent } from "./app/agent.js";
import { Runner } from "./app/runner.js";
import type { ITool } from "./utils/typeUtils.js";
import "dotenv/config";
import axios from "axios";

const getWeather = async (cityName: string): Promise<string> => {
    const city = cityName.toLowerCase();
    const url = `https://wttr.in/${city}?format=%C+%t`;
    const response = await axios.get(url, { responseType: 'text' });
    return JSON.stringify({ cityName, weatherInfo: response.data });
}

const tool: ITool = {
    name: 'getWeatherTool',
    description: 'Tool to get the weather infomation',
    executor: getWeather
}

async function inti() {
    const options = {
        name: 'Coding-agent',
        instructions: 'You are an expert problem solver',
        apiKey: process.env.OPENAI_API_KEY ?? '',
        toolsList: [tool]
    }
    // create agent
    const agent = new Agent(options);

    const agentRun = new Runner(agent, 'Hey can you get me the weather of Bengaluru and Goa');
    await agentRun.run();
    const result = agentRun.getMessages();

    console.log(result[result.length - 1]);
}

inti();