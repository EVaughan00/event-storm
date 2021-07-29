import { CoordinateDTO } from "./Coordinate";
import { Mappable } from "../../../helpers/hooks";
import { FormModel } from "../../../utils/FormModel";
import EventBlockViewModel, { BlockType } from "./EventBlockViewModel";
import Validation from "../../../utils/Validation";

export class EventBlockDTO extends FormModel implements Mappable {
    public id: string = "";

    @Validation.Rule({ required: true, message: "Please provide a block name"})
    public name: string = "";
    public solutionId: string = ""; 

    @Validation.Rule({ required: true, message: "Please select a block type"})
    public type: BlockType = BlockType.COMMAND;
    public coordinate: CoordinateDTO = new CoordinateDTO();

    public Map(): EventBlockViewModel {
        var block = new EventBlockViewModel()
        
        block.id = this.id,
        block.name = this.name;
        block.solutionId = this.solutionId
        block.type = this.type;
        block.coordinate = new CoordinateDTO().copy(this.coordinate).Map()

        return block
    }
}