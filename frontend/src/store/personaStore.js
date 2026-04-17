import {create} from "zustand";

const personaStore = create((set) => ({
    personas: [],
    concerns: [],
    details: {}
}))

export default personaStore;