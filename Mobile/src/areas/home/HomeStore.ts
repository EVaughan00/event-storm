import { NativeEventEmitter, NativeScrollEvent, NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import { HomeLists } from "../../helpers/consts";
import { CardSection } from "../../components/CardSection";
import { BaseStore } from "../../utils/BaseStore";


export interface HomeState {
    currentCardSection: number
    verticalScroll: NativeScrollEvent
    beginVerticalScroll: NativeScrollEvent
    updatedCardSections: boolean
}

export interface HomeActions {
    selectCardSection: (section: number) => void
    updateVerticalScroll: (event: NativeScrollEvent) => void
    updateBeginVerticalScroll: (event: NativeScrollEvent) => void
    updateCardSections: (updated: boolean) => void
}

export class HomeStore 
    extends BaseStore<HomeState, HomeActions> 
    implements HomeActions {

    protected prototype = HomeStore.prototype;
    protected initialState = {
        currentCardSection: 0,
        verticalScroll: {} as NativeScrollEvent,
        beginVerticalScroll: {} as NativeScrollEvent,
        updatedCardSections: false
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

    public updateCardSections(updated: boolean) {
        this.setState({
            ...this.state,
            updatedCardSections: updated,
        })
    }
}