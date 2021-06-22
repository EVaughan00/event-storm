import { AccountStore } from "./areas/account/AccountStore"
import { HomeStore } from "./areas/home/HomeStore"
import { SolutionStore } from "./areas/solution/SolutionStore"

const AppStore = {
    account: new AccountStore(),
    home: new HomeStore(),
    solution: new SolutionStore()
}

export { AppStore }