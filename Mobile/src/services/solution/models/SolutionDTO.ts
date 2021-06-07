import { FormModel } from "../../../utils/FormModel";
import Validation from "../../../utils/Validation";
import { ContributorDTO } from "./ContributorDTO";

export class SolutionDTO extends FormModel {
    @Validation.Rule({ required: true, message: "Please provide a solution name"})
    public name: string = "";

    public description: string = "";

    public codeBase: string = "";
        
    public useEventStorm: boolean = false;

    public useModelRepository: boolean = false;

    public useTaskStack: boolean = false;

    public Contributors: Array<ContributorDTO> = new Array<ContributorDTO>();
}