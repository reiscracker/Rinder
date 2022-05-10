import { useState } from "react";
import { shuffle } from "../helpers";
import ALL_PROFILES from "./profiles";

function shuffleProfiles() {
    return shuffle([...ALL_PROFILES]);
}

export function useProfiles() {
    const [currentStack, setCurrentStack] = useState(shuffleProfiles());
    const currentProfile = currentStack[0];
    const nextProfile = currentStack[1];
    function toNextProfile() {
        setCurrentStack(currentStack.slice(1));
    }
    function resetProfiles() {
        setCurrentStack(shuffleProfiles());
    }

    return [currentProfile, nextProfile, toNextProfile, resetProfiles];
}