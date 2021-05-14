import { v4 as uuidv4 } from 'uuid';
import { SelectableViewModel } from './ViewModel';
import Event from './Event';
import Metrics from './Metrics';
import Model from './Model';
import Task from './Task';



export default class Solution extends SelectableViewModel {
     
    private _tasks: Array<Task>
    private _models: Array<Model>
    private _events: Array<Event>

    constructor(name: string) {
        super(name);

        this._tasks = new Array<Task>();
        this._events = new Array<Event>();
        this._models = new Array<Model>();
    }


    public get tasks() {
        return this._tasks
    }

    public get events() {
        return this._events
    }

    public get models() {
        return this._models
    }

    public get completedTasks(): Array<Task> {

        let completed = Array<Task>();

        this._tasks.forEach(task => {
            if (task.completed)
                completed.push(task)
        });

        return completed;
    }

    public get completedEvents(): Array<Event> {

        let completed = Array<Event>();

        this._events.forEach(task => {
            if (task.completed)
                completed.push(task)
        });

        return completed;
    }

    public get completedModels(): Array<Model> {

        let completed = Array<Model>();

        this._models.forEach(task => {
            if (task.completed)
                completed.push(task)
        });

        return completed;
    }

    public addModel(model: Model) {
        this._models.push(model);
    }
    public addEvent(event: Event) {
        this._events.push(event);
    }
    public addTask(task: Task) {
        this._tasks.push(task);
    }


}