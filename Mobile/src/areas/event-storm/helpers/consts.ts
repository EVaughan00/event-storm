import { SelectOption } from "../../../components/FormElement";
import { BlockType } from "../../../services/eventStorm/models/EventBlockViewModel";

export const BlockTypeOptions: SelectOption[] = 
[
    {value: BlockType.COMMAND, label: 'Command'},
    {value: BlockType.QUERY, label: 'Query'},
    {value: BlockType.EFFECT, label: 'Effect'},
    {value: BlockType.PROCESS, label: 'Process'},
    {value: BlockType.LABEL, label: 'Label'}
]

export const DefaultBlockTypeOption = {value: "", label: 'Select a block type...'}