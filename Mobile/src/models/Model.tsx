import React from 'react-native';
import {v4 as uuidv4} from 'uuid';
import { Entity } from './ViewModel';

export default class Model extends Entity {
    private _completed: boolean;

    constructor(name: string) {
        super(name);
    }

    public get completed() {
        return this._completed
    }
    public set completed(value: boolean) {
        this._completed = value
    }
}