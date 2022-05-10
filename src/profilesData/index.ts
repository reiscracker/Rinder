import { ImageSourcePropType } from "react-native";

export interface ProfileResponse {
    type: "response" | "await user message" | "warning" | "info";
    text?: string;
}

export interface Profile {
    name: string;
    tags: string[];
    image: ImageSourcePropType;
    imageAuthor?: string; // If undefined, no crediting the author is needed
    responses: ProfileResponse[];
}
export { useProfiles } from "./useProfiles";