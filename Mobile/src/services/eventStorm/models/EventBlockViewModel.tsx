import Coordinate from "./Coordinate"

export default class EventBlockViewModel {
    private _id: string
    private _name: string
    private _solutionId: string
    private _type: BlockType
    private _coordinate: Coordinate

    public set id(id: string) {
        this._id = id
    }
    public set name(name: string) {
        this._name = name
    }
    public set solutionId(solutionId: string) {
        this._solutionId = solutionId
    }
    public set type(type: BlockType) {
        this._type = type
    }
    public set coordinate(coordinate: Coordinate) {
        this._coordinate = coordinate
    }
    public get id() {
        return this._id
    }
    public get name() {
        return this._name
    }
    public get solutionId() {
        return this._solutionId
    }
    public get type() {
        return this._type
    }
    public get coordinate() {
        return this._coordinate
    }
}

export enum BlockType {
    COMMAND = 'command',
    QUERY = 'query',
    EFFECT = 'effect',
    PROCESS = 'process',
    LABEL = 'label'
}