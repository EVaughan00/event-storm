import { Mappable } from "../../../helpers/hooks";
import { FormModel } from "../../../utils/FormModel";
import Validation from "../../../utils/Validation";
import { ContributorDTO } from "./ContributorDTO";
import SolutionViewModel from "./SolutionViewModel";

export class SolutionDTO extends FormModel implements Mappable {
    public id: string = "";

    @Validation.Rule({ required: true, message: "Please provide a solution name"})
    @Validation.Rule({ pattern: Validation.AlphaNumericSpaces, message: "Please enter letters, numbers, and spaces only"})
    @Validation.Rule({ max: 20, message: "Cannot exceed 20 characters long" })
    public name: string = "";

    public templateId: string = "";

    public description: string = "";

    public codeBase: string = "";
        
    public useEventStorm: boolean = false;

    public useModelRepository: boolean = false;

    public useTaskStack: boolean = false;

    public Contributors: Array<ContributorDTO> = new Array<ContributorDTO>();

    public Map(): SolutionViewModel {
        var solution = new SolutionViewModel()

        solution.id = this.id
        solution.name = this.name
        solution.templateId = this.templateId
        solution.description = this.description
        solution.codeBase = this.codeBase
        solution.useEventStorm = this.useEventStorm
        solution.useModelRepository = this.useModelRepository
        solution.useTaskStack = this.useTaskStack

        return solution

    }
}