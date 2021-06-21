import { NativeScrollEvent } from "react-native";
import { BaseStore } from "../../utils/BaseStore";


export interface HomeState {
    currentCardSection: number
    verticalScroll: NativeScrollEvent
    beginVerticalScroll: NativeScrollEvent
    updatedSolutionCards: boolean
    updatedTemplateCards: boolean
}

export interface HomeActions {
    selectCardSection: (section: number) => void
    updateVerticalScroll: (event: NativeScrollEvent) => void
    updateBeginVerticalScroll: (event: NativeScrollEvent) => void
    updateSolutionCards: (updated: boolean) => void
    updateTemplateCards: (updated: boolean) => void
}

export class HomeStore 
    extends BaseStore<HomeState, HomeActions> 
    implements HomeActions {

    protected prototype = HomeStore.prototype;
    protected initialState = {
        currentCardSection: 0,
        verticalScroll: {} as NativeScrollEvent,
        beginVerticalScroll: {} as NativeScrollEvent,
        updatedSolutionCards: false,
        updatedTemplateCards: false
    }

    constructor() {
        super();                
    }

    public selectCardSection(section: number) {
        this.setState({
            ...this.state,
            currentCardSection: section,
        })
    }

    public updateVerticalScroll(event: NativeScrollEvent) {
        this.setState({
            ...this.state,
            verticalScroll: event,

        })
    }

    public updateBeginVerticalScroll(event: NativeScrollEvent) {
        this.setState({
            ...this.state,
            beginVerticalScroll: event,
        })
    }

    public updateSolutionCards(updated: boolean) {
        this.setState({
            ...this.state,
            updatedSolutionCards: updated,
        })
    }

    public updateTemplateCards(updated: boolean) {
        this.setState({
            ...this.state,
            updatedTemplateCards: updated,
        })
    }
}