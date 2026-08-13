import type { Agent } from "./agent.js";

export class Runner {
    private _agent: Agent;
    private _prompt: string;

    constructor(agent: Agent, prompt: string) {
        this._agent = agent
        this._prompt = prompt
    }

    public async run() {
        console.log(this._agent.getInstructions)
        console.log(this._agent.getName)
        console.log(this._prompt)
    }
}