import { ReactElement } from "react";


export interface CardableItem {
    name: string
    id: string;
    renderCard: (index: number) => JSX.Element
}