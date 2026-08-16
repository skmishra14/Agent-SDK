## This is an OpenAI Agent SDK with the following features
- Custom Instructions
- Tools calling 
- *Input Guard Rails (To be added)
- *Output Guard Rails (To be added)

## Setting up the project
- Set the env variables by creating **.env** file and set the variables as mentioned in **.env.sample** file
- first install the dependencies
```shell
npm i
```
- build the project using:
```shell
npm run build
```
- run the example file in **index.ts** using 
```shell
npm run dev
```

## How to use the agent
- Create a agent from Agent class
```js
const agent = new Agent({
    name: 'Agent-name',
    instructions: 'You are an AI assistant'
    apiKey: 'Your-openai-key'
});
```
- Create the runner for the above agent
```js
const agentRun = new Runner(agent, 'Prompt-here');
await agentRun.run();
```
- To get the complete history of messages exchanged 
```js
agentRun.getMessages(); // returns the messages
```
- To get only the final **OUTPUT** 
```js
const result = agent.getMessages();

const finalOutput = result[result.length-1];
```

## Tools structure
- Interfact for defining tools 
```ts
ITools = {
    name: string;
    description: string;
    docs?: string;
    executor: (input: string) => Promise<string>
}
```
- Tools can be added by doing
```ts
const agent = new Agent({
    name: 'Agent-name',
    instructions: 'You are an AI assistant'
    apiKey: 'Your-openai-key'
});

const weatherTool: ITool = {
    name: 'getWeatherTool',
    description: 'Tool to get the weather infomation',
    executor: getWeather
}

// define async getWeather() {}

const cliTool: ITool = {
    name: 'cliTool',
    description: 'This tool will execute the cli commands when requested',
    executor: cliToolCall
}

// define async cliToolCall() {}

agent.addTools([weatherTool, cliTool]);
```