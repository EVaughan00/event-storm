import { FormModel } from "../../../utils/FormModel";

export class UserDetails extends FormModel {
    public id: string = "";
    public email: string = "";
    public firstName: string = "";
    public lastName: string = "";

    public fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}