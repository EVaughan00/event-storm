import { NativeEventEmitter, NativeScrollEvent, NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import { HomeLists } from "../../helpers/consts";
import { BaseStore } from "../../utils/BaseStore";


export interface HomeState {
    currentList: HomeLists
    verticalScroll: NativeScrollEvent
    beginVerticalScroll: NativeScrollEvent
}

export interface HomeActions {
    selectList: (list: HomeLists) => void
    updateVerticalScroll: (event: NativeScrollEvent) => void
    updateBeginVerticalScroll: (event: NativeScrollEvent) => void
}

export class HomeStore 
    extends BaseStore<HomeState, HomeActions> 
    implements HomeActions {

    protected prototype = HomeStore.prototype;
    protected initialState = {
        currentList: HomeLists.SOLUTIONS,
        verticalScroll: {} as NativeScrollEvent,
        beginVerticalScroll: {} as NativeScrollEvent,
    }

    constructor() {
        super();                
    }

    public selectList(list: HomeLists) {
        this.setState({
            ...this.state,
            currentList: list,
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
}