export interface IMessages {
    role: 'user' | 'assistant' | 'developer';
    content: string
}
export interface ITool {
    name: string;
    description: string;
    docs?: string;
    executor: (input: string) => Promise<string>
}