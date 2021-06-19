
export default class TemplateViewModel{

  private _id: string
  private _name: string;
  private _image: string;
  private _description: string;
  private _codeBase: string;
  private _useEventStorm: boolean;
  private _useModelRepository: boolean;
  private _useTaskStack: boolean;

  constructor() {
  }

  public get id(): string {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get image(): string {
    return this._image;
  }
  public get description(): string {
    return this._description;
  }
  public get codeBase(): string {
    return this._codeBase;
  }
  public get useEventStorm(): boolean {
    return this._useEventStorm;
  }
  public get useModelRepository(): boolean {
    return this._useModelRepository;
  }
  public get useTaskStack(): boolean {
    return this._useTaskStack;
  }
  public set id(id: string) {
    this._id = id;
  }
  public set name(name: string) {
    this._name = name;
  }
  public set description(name: string) {
    this._description = name;
  }
  public set codeBase(name: string) {
    this._codeBase = name;
  }
  public set useEventStorm(choice: boolean) {
    this._useEventStorm = choice;
  }
  public set useModelRepository(choice: boolean) {
    this._useModelRepository = choice;
  }
  public set useTaskStack(choice: boolean) {
    this._useTaskStack = choice;
  }
}
