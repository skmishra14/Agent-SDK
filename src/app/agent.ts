import type { ITool } from "../utils/typeUtils.js";

export class Agent {
    private _instructions: string | null;
    private _name: string | null;
    private _model: string;
    private _inputGuardRails: string;
    private _outputGuardRails: string;
    private _toolsList: Array<ITool>;
    private _apiKey: string;

    constructor(options: {
        name: string | null,
        instructions?: string | null,
        apiKey: string,
        model?: string,
        inputGuradRails?: string | null,
        outputGuardRails?: string | null,
        toolsList?: Array<ITool> | [],
    }) {
        this._name = options.name ?? '';
        this._instructions = options.instructions ?? '';
        this._model = options.model || "gpt-4o-mini";
        this._inputGuardRails = options.inputGuradRails ?? '';
        this._outputGuardRails = options.outputGuardRails ?? '';
        this._toolsList = options.toolsList ?? [];
        this._apiKey = options.apiKey;
    }

    get getName() {
        return this._name;
    }

    get getInstructions() {
        return this._instructions;
    }

    get getModel() {
        return this._model;
    }

    get getInputGuardRails() {
        return this._inputGuardRails;
    }

    get getOutputGuardRails() {
        return this._outputGuardRails;
    }

    get getAvaiableTools() {
        return this._toolsList;
    }

    get getApiKey() {
        return this._apiKey;
    }

    public setInstructions(userInstructions: string) {
        this._instructions = userInstructions;
    }

    public setModel(modelName: string) {
        this._model = modelName;
    }

    public setInputGuardRail(inputGuardRail: string) {
        this._inputGuardRails = inputGuardRail;
    } 

    public setOutputGuardRail(outputGuardRail: string) {
        this._outputGuardRails = outputGuardRail;
    }

    public setApiKey(apiKey: string) {
        this._apiKey = apiKey;
    }

    public addTools(tool: Array<ITool>) {
        this._toolsList.push(...tool);
    }
}

