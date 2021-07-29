import EventStormViewModel from "../../services/eventStorm/models/EventStormViewModel";
import SolutionViewModel from "../../services/solution/models/SolutionViewModel";
import { BaseStore } from "../../utils/BaseStore";
import { GridNode } from "./components/Grid/GridNode";


export interface EventStormState {
    // eventStorm: EventStormViewModel | undefined
    currentSolution: SolutionViewModel | undefined
    currentGridNode: GridNode
    updatedEventStorm: boolean
}

export interface EventStormActions {
    // setEventStorm: (eventStorm: EventStormViewModel) => void
    setCurrentSolution: (solution: SolutionViewModel) => void
    setCurrentGridNode: (gridNode: GridNode) => void
    updateEventStorm: (updated: boolean) => void
}

export class EventStormStore 
    extends BaseStore<EventStormState, EventStormActions> 
    implements EventStormActions {

    protected prototype = EventStormStore.prototype;
    protected initialState = {
        eventStorm: undefined,
        currentSolution: undefined,
        currentGridNode: {} as GridNode,
        updatedEventStorm: false,
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

    public setCurrentGridNode(gridNode: GridNode) {
        this.setState({
            ...this.state,
            currentGridNode: gridNode,
        })
    }


    public updateEventStorm(updated: boolean) {
        this.setState({
            ...this.state,
            updatedEventStorm: updated,
        })
    }


    // public setEventStorm(eventStorm: EventStormViewModel) {
    //     this.setState({
    //         ...this.state,
    //         eventStorm: eventStorm,
    //     })
    // }
}