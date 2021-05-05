import Event from './Event';
import Metrics from './Metrics';
import Model from './Model';
import Solution from './Solution';
import Task from './Task';
import { SelectableViewModel } from './ViewModel';



export default class Template extends SelectableViewModel {
     
    private _tasks: Array<Task>
    private _models: Array<Model>
    private _events: Array<Event>

    public subTitle?: string | undefined;
    public status: boolean;
    public metrics: Metrics;
    public image?: string | undefined;

    constructor(solution: Solution) {
        super(solution.name)

        this._tasks = new Array<Task>();
        this._events = new Array<Event>();
        this._models = new Array<Model>();

        this.fromSolution(solution)
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

    public addModel(model: Model) {
        this._models.push(model);
    }
    public addEvent(event: Event) {
        this._events.push(event);
    }
    public addTask(task: Task) {
        this._tasks.push(task);
    }

    public fromSolution(solution: Solution) {
        this._events = solution.events
        this._models = solution.models
        this._tasks = solution.tasks
    }
}

