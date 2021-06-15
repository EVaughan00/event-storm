export type Colors = "primary" | "error" | "warning" | "default" | "strong";
export type Areas = "eventStorm" | "taskStack" | "modelRepository";

const colors: Record<Colors, string> = {
    primary: "rgb(98, 0, 238)",
    error: "#f73313",
    warning: "#ffcb0f",
    default: "#aaa",
    strong: "#333"
}

const areaColors: Record<Areas, string> = {
    eventStorm: "#EB5A5A",
    taskStack: "#007CEE",
    modelRepository: "#01A299",
}

export default {
    colors,
    areaColors,
    unit: 8
}