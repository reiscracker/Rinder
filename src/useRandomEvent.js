import { useRef } from "react";

const INITIAL_CHANCE = 0.3;

export default function useRandomEvent(onEvent) {
    let chance = useRef(INITIAL_CHANCE).current;

    function triggerChance() {
        const isSuccess = Math.random() < chance;
        if (isSuccess) {
            chance = INITIAL_CHANCE;
            onEvent();
        } else {
            chance += INITIAL_CHANCE;
        }
    }

    return triggerChance;
}