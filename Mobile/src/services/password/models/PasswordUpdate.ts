import { FormModel } from "../../../utils/FormModel";
import Validation from "../../../utils/Validation";

export class PasswordUpdate extends FormModel {
    @Validation.Rule({ required: true, message: "Please provide a password"})
    public password: string = "";

    @Validation.Rule({ required: true, message: "Please confirm your password"})
    public passwordConfirm: string = "";
}