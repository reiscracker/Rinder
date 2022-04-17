export interface ProfileResponse {
    type: "response" | "await user message" | "system warning" | "system info";
    text?: string;
}

export interface Profile {
    name: string;
    tags: string[];
    image: NodeRequire;
    responses: ProfileResponse[];
}