import { createContext } from "react";
import { GridNode } from "../components/Grid/GridNode";

export interface INodeActions {
    onNodePress: (node: GridNode) => void;
    onNodeDoublePress: (node: GridNode) => void;
  }
  
export const NodeActions = createContext<INodeActions | undefined>(undefined);
