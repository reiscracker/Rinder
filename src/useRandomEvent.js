import { useRef } from "react";

const INITIAL_CHANCE = 0.3;

export default function useRandomEvent(onEvent) {
    let chance = useRef(INITIAL_CHANCE);

    function triggerChance() {
        const attempt = Math.random();
        const isSuccess = attempt < chance.current;
        if (isSuccess) {
            chance.current = INITIAL_CHANCE;
            onEvent();
        } else {
            chance.current += INITIAL_CHANCE;
        }
    }

    return triggerChance;
}