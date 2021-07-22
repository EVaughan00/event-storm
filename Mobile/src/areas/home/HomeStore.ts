import { Animated, NativeScrollEvent } from "react-native";
import { BaseStore } from "../../utils/BaseStore";


export interface HomeState {
    currentCardSection: number
    verticalScroll: Animated.Value
    beginVerticalScroll: number
    endVerticalScroll: number
    updatedSolutionCards: boolean
    updatedTemplateCards: boolean
}

export interface HomeActions {
    selectCardSection: (section: number) => void
    updateVerticalScroll: (value: number) => void
    updateBeginVerticalScroll: (value: number) => void
    updateEndVerticalScroll: (value: number) => void
    updateSolutionCards: (updated: boolean) => void
    updateTemplateCards: (updated: boolean) => void
}

export class HomeStore 
    extends BaseStore<HomeState, HomeActions> 
    implements HomeActions {

    protected prototype = HomeStore.prototype;
    protected initialState = {
        currentCardSection: 0,
        verticalScroll: new Animated.Value(0),
        beginVerticalScroll: 0,
        endVerticalScroll: 0,
        updatedSolutionCards: false,
        updatedTemplateCards: false,
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

    public updateVerticalScroll(value: number) {
        this.state.verticalScroll.setValue(value)
    }

    public updateBeginVerticalScroll(value: number) {
        this.setState({
            ...this.state,
            beginVerticalScroll: value,
        })
    }

    public updateEndVerticalScroll(value: number) {
        this.setState({
            ...this.state,
            endVerticalScroll: value,
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