import { NativeScrollEvent } from "react-native";
import SolutionViewModel from "../../services/solution/models/SolutionViewModel";
import { BaseStore } from "../../utils/BaseStore";


export interface SolutionState {
    currentSolution: SolutionViewModel
}

export interface SolutionActions {
    setCurrentSolution: (solution: SolutionViewModel) => void

}

export class SolutionStore 
    extends BaseStore<SolutionState, SolutionActions> 
    implements SolutionActions {

    protected prototype = SolutionStore.prototype;
    protected initialState = {
        currentSolution: {} as SolutionViewModel,
    }

    constructor() {
        super();                
    }

    public setCurrentSolution(solution: SolutionViewModel) {
        this.setState({
            ...this.state,
            currentSolution: solution,
        })
    }
}