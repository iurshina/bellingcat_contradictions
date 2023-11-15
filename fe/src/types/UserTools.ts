export interface UserTools {
    agent: string;
    roles: string[];
    tools: string[];
}

export const getSessionlessTools = (): UserTools => {
    return {
        agent: 'N/A',
        roles: [],
        tools: []
    }
}
