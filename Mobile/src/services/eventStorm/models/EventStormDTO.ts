import { Mappable } from "../../../helpers/hooks";
import { FormModel } from "../../../utils/FormModel";
import { EventBlockDTO } from "./EventBlockDTO";
import EventBlockViewModel from "./EventBlockViewModel";
import { EventEdgeDTO } from "./EventEdgeDTO";
import EventStormViewModel from "./EventStormViewModel";

export class EventStormDTO extends FormModel implements Mappable {

    public blocks: Array<EventBlockDTO> = [];
    public edges: Array<EventEdgeDTO> = []; 

    public Map(): EventStormViewModel {
        var storm = new EventStormViewModel()

        storm.blocks = this.blocks.map((dto) => new EventBlockDTO().copy(dto).Map())
        storm.edges = this.edges.map((dto) => dto.Map())
            
        return storm
    }
}