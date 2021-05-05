import { FormModel } from "../../../utils/FormModel";
import Validation from "../../../utils/Validation";

export class PasswordResetRequest extends FormModel {
    @Validation.Rule({ required: true, message: "Please provide an email"})
    @Validation.Rule({ pattern: Validation.Email, message: "This email is invalid"})
    public email: string = "";
}