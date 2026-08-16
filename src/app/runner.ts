import type { Agent } from "./agent.js";
import { HARNESS_PROMPT } from "../utils/harnessPrompt.js";
import { INPUT_GUARD_RAILS } from "../utils/inputGuardRails.js";
import { OUTPUT_GUARD_RAILS } from "../utils/outputGuradRails.js";
import type { IMessages } from "../utils/typeUtils.js";
import type { ITool } from "../utils/typeUtils.js";

export class Runner {
    private _agent: Agent;
    private _prompt: string;
    private MESSAGE_DB: Array<Object>;
    private _userInstructions: string;
    private _toolMap: Map<string, ITool>;

    constructor(agent: Agent, prompt: string) {
        this._agent = agent;
        this._prompt = prompt;
        this.MESSAGE_DB = [];

        this._toolMap = new Map();
        // map each toolName -> tool
        this._agent.getAvaiableTools.forEach(tool => {
            this._toolMap.set(tool.name, tool);
        });

        this._userInstructions = `${HARNESS_PROMPT} \n\n 
        System Prompt:
        ${this._agent.getInstructions} \n\n
        
        Available Tools:
        ${this._agent.getAvaiableTools.map(tool =>
            JSON.stringify({
                functionName: tool.name,
                functionDescription: tool.description,
                functionDoc: tool.docs
            })).join('\n')}
        `;
    }

    public async run() {
        // initial message to messageDB
        this.MESSAGE_DB.push({ role: 'system', message: this._userInstructions });

        // think... next steps
    }
}