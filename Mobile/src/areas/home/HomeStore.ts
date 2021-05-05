import { NativeEventEmitter, NativeScrollEvent, NativeSyntheticEvent, NativeTouchEvent } from "react-native";
import { HomeLists } from "../../helpers/consts";
import { BaseStore } from "../../utils/BaseStore";


export interface HomeState {
    currentList: HomeLists
    verticalScrollEvent: NativeScrollEvent
}

export interface HomeActions {
    selectList: (list: HomeLists) => void
    updateVerticalScrollEvent: (event: NativeScrollEvent) => void
}

export class HomeStore 
    extends BaseStore<HomeState, HomeActions> 
    implements HomeActions {

    protected prototype = HomeStore.prototype;
    protected initialState = {
        currentList: HomeLists.SOLUTIONS,
        verticalScrollEvent: {} as NativeScrollEvent
    }

    constructor() {
        super();                
    }

    public selectList(list: HomeLists) {
        this.setState({
            currentList: list,
            verticalScrollEvent: this.state.verticalScrollEvent
        })
    }

    public updateVerticalScrollEvent(event: NativeScrollEvent) {
        this.setState({
            currentList: this.state.currentList,
            verticalScrollEvent: event
        })
    }
}