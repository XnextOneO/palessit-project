import {create} from "zustand";

interface ITwoStore {
    text: string;
    setNewText: (newText: string) => void;
}

export const useTwoStore = create<ITwoStore>((set) => ({
    text: 'init text',
    setNewText: (newText: string) => {
        set((state) => {
            return {
                ...state,
                text: newText
            }
        });
    },
}))