import { FormModel } from "../../../utils/FormModel";
import Validation from "../../../utils/Validation";

export class PasswordResetCode extends FormModel {
    @Validation.Rule({ required: true, message: "Please enter a reset code"})
    public resetCode: string = "";
}