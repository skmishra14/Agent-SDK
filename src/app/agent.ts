import type { ITool } from "../utils/typeUtils.js";

export class Agent {
    private _instructions: string | null;
    private _name: string | null;
    private _model: string;
    private _inputGuardRails: string;
    private _outputGuardRails: string;
    private _toolsList: Array<ITool>;

    constructor(options: {
        name: string | null,
        instructions?: string | null,
        model?: string,
        inputGuradRails?: string | null,
        outputGuardRails?: string | null,
        toolsList?: Array<ITool>
    }) {
        this._name = options.name ?? '';
        this._instructions = options.instructions ?? '';
        this._model = options.model || "gpt_4o";
        this._inputGuardRails = options.inputGuradRails ?? '';
        this._outputGuardRails = options.outputGuardRails ?? '';
        this._toolsList = options.toolsList ?? [];
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

    set setInstructions(userInstructions: string) {
        this._instructions = userInstructions;
    }

    set setModel(modelName: string) {
        this._model = modelName;
    }

    set setInputGuardRail(inputGuardRail: string) {
        this._inputGuardRails = inputGuardRail;
    } 

    set setOutputGuardRail(outputGuardRail: string) {
        this._outputGuardRails = outputGuardRail;
    }

    public addTools(tool: ITool) {
        this._toolsList.push(tool);
    }
}

