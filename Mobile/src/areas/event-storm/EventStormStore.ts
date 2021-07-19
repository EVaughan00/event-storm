import { NativeScrollEvent } from "react-native";
import SolutionViewModel from "../../services/solution/models/SolutionViewModel";
import { BaseStore } from "../../utils/BaseStore";
import { GridNode } from "./components/Grid/GridNode";


export interface EventStormState {
    currentSolution: SolutionViewModel
    updatedEventStorm: boolean
}

export interface EventStormActions {
    setCurrentSolution: (solution: SolutionViewModel) => void
    updateEventStorm: (updated: boolean) => void
}

export class EventStormStore 
    extends BaseStore<EventStormState, EventStormActions> 
    implements EventStormActions {

    protected prototype = EventStormStore.prototype;
    protected initialState = {
        currentSolution: {} as SolutionViewModel,
        updatedEventStorm: false
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

    public updateEventStorm(updated: boolean) {
        this.setState({
            ...this.state,
            updatedEventStorm: updated,
        })
    }
}