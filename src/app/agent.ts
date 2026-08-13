export class Agent {
    private _instructions: string | null;
    private _name: string | null;

    constructor(options:{
        name?: string | null,
        instructions?: string | null
    }) {
        this._name = options.name ?? '';
        this._instructions = options.instructions ?? '';
    }

    set setInstructions(instructions: string | null) {
        this._instructions = instructions;
    }

    set setName(name: string | null) {
        this._name = name;
    }

    get getName() {
        return this._name;
    }

    get getInstructions() {
        return this._instructions;
    }
}

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

