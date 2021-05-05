import { AccountStore } from "./areas/account/AccountStore"
import { HomeStore } from "./areas/home/HomeStore"

const AppStore = {
    account: new AccountStore(),
    home: new HomeStore()
}

export { AppStore }