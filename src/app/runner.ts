import type { Agent } from "./agent.js";
import { HARNESS_PROMPT } from "../utils/harnessPrompt.js";
import { INPUT_GUARD_RAILS } from "../utils/inputGuardRails.js";
import { OUTPUT_GUARD_RAILS } from "../utils/outputGuradRails.js";
import type { IMessages } from "../utils/typeUtils.js";
import type { ITool } from "../utils/typeUtils.js";
import OpenAI from "openai";

export class Runner {
    private _agent: Agent;
    private _prompt: string;
    private MESSAGE_DB: Array<IMessages>;
    private _userInstructions: string;
    private _toolMap: Map<string, ITool>;
    private _openAIClient: OpenAI;
    private _MAX_LOOP: number = 30;

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

        // create openai client
        this._openAIClient = new OpenAI({
            apiKey: this._agent.getApiKey
        });
    }
    
    // return the messages 
    public getMessages() {
        return this.MESSAGE_DB;
    }

    public async run() {
        // add the prompt 
        this.MESSAGE_DB.push({ role: 'user', content: this._prompt });

        // loop through
        for (let i = 0; i < this._MAX_LOOP; i++) {
            // get the LLM response
            const response = await this._openAIClient.chat.completions.create({
                model: this._agent.getModel,
                messages: [
                    {
                        role: "system",
                        content: this._userInstructions
                    },
                    ...this.MESSAGE_DB.map(message => ({ role: message.role, content: message.content }))
                ]
            });

            // store the raw response to MESSAGE_DB
            const rawResult: string = response.choices[0]?.message.content as string;

            this.MESSAGE_DB.push({ role: 'assistant', content: rawResult });

            // parse the LLM response to JSON object 
            const parsedResult = JSON.parse(rawResult);

            // for the the output condition
            if (parsedResult.step.toUpperCase() === 'OUTPUT') {
                return this.MESSAGE_DB;
            }

            // check for the tool call
            if (parsedResult.step.toUpperCase() === 'TOOL_REQUEST') {
                const { functionName, input } = parsedResult;

                // get the tool
                const tool = this._toolMap.get(functionName);

                if (!tool) {
                    this.MESSAGE_DB.push({
                        role: 'developer',
                        content: `Error: function with functionName: ${functionName} does not exist`
                    });
                    continue;
                }
                else {
                    const functionResult = await tool?.executor(input);
                    this.MESSAGE_DB.push({
                        role: 'developer', content: JSON.stringify({
                            functionName: functionName,
                            input: input,
                            functionResult
                        })
                    });
                }

            }
        }
    }
}