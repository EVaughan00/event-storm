import React from 'react-native';
import {v4 as uuidv4} from 'uuid';

export default class Task {

    private _name: string;
    private _id: string;

    private _completed: boolean;

    constructor(name: string) {
        this._id = uuidv4();
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    public get id(): string {
        return this._id;
    }

    public get completed() {
        return this._completed
    }
    public set completed(value: boolean) {
        this._completed = value
    }
}