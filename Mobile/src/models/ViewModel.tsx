import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import Metrics from './Metrics';

export class Entity {

    private _name: string
    private _id: string

    constructor(name: string) {
        this._name = name
    }

    public get name(): string {
        return this._name;
    }

    public get id(): string {
        return this._id;
    }
}

export class SelectableViewModel extends Entity {

    public subTitle?: string | undefined;
    public status: boolean;
    public metrics: Metrics;
    public image?: string | undefined;

    constructor(name: string) {
        super(name);
    }
}

