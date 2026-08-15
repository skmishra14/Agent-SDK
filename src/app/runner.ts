import type { Agent } from "./agent.js";
import { SYSTEM_PROMPT } from "../utils/systemPrompt.js";
import { INPUT_GUARD_RAILS } from "../utils/inputGuardRails.js";
import { OUTPUT_GUARD_RAILS } from "../utils/outputGuradRails.js";

export class Runner {
    private _agent: Agent;
    private _prompt: string;
    private MESSAGE_DB: Array<Object>

    constructor(agent: Agent, prompt: string) {
        this._agent = agent;
        this._prompt = prompt;
        this.MESSAGE_DB = [];
    }

    public async run() {
        const systemPrompt = SYSTEM_PROMPT + this._agent.getInstructions;
        const inputGuardRails = INPUT_GUARD_RAILS + this._agent.getInputGuardRails;
        const outputGuardRails = OUTPUT_GUARD_RAILS + this._agent.getOutputGuardRails;

        // initial message to messageDB
        this.MESSAGE_DB.push({ role: 'system', message: systemPrompt });

        // think... next steps
    }
}