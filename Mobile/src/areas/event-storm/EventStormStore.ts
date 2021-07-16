import { NativeScrollEvent } from "react-native";
import SolutionViewModel from "../../services/solution/models/SolutionViewModel";
import { BaseStore } from "../../utils/BaseStore";
import GridNode from "./components/GridNode";


export interface EventStormState {
    currentSolution: SolutionViewModel
    selectedNode: GridNode
    updatedGrid: boolean
    zoomed: boolean
    panning: boolean
}

export interface EventStormActions {
    setCurrentEventStorm: (solution: SolutionViewModel) => void
    updateGrid: (updated: boolean) => void
    setZoomed: (zoomed: boolean) => void
    setPanning: (panning: boolean) => void
}

export class EventStormStore 
    extends BaseStore<EventStormState, EventStormActions> 
    implements EventStormActions {

    protected prototype = EventStormStore.prototype;
    protected initialState = {
        currentSolution: {} as SolutionViewModel,
        selectedNode: {} as GridNode,
        updatedGrid: false,
        zoomed: false,
        panning: false
    }

    constructor() {
        super();                
    }

    public setCurrentEventStorm(solution: SolutionViewModel) {
        this.setState({
            ...this.state,
            currentSolution: solution,
        })
    }

    public updateGrid(updated: boolean) {
        this.setState({
            ...this.state,
            updatedGrid: updated
        })
    }

    public setZoomed(zoomed: boolean) {
        this.setState({
            ...this.state,
            zoomed: zoomed
        })
    }

    public setPanning(panning: boolean) {
        this.setState({
            ...this.state,
            panning: panning
        })
    }
}