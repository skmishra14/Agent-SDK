export class Agent {
    private _instructions: string | null;
    private _name: string | null;
    private _model: string;
    private _inputGuardRails: string;
    private _outputGuardRails: string;

    constructor(options: {
        name: string | null,
        instructions?: string | null,
        model?: string,
        inputGuradRails?: string | null,
        outputGuardRails?: string | null
    }) {
        this._name = options.name ?? '';
        this._instructions = options.instructions ?? '';
        this._model = options.model || "gpt_4o";
        this._inputGuardRails = options.inputGuradRails ?? '';
        this._outputGuardRails = options.outputGuardRails ?? '';
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
 }

