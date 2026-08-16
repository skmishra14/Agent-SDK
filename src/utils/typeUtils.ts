export interface IMessages {
    role: 'user' | 'assitent' | 'developer';
    constent: string 
}
export interface ITool {
    name: string;
    description: string;
    docs?: string;
    executor: (input: string) => Promise<string>
}