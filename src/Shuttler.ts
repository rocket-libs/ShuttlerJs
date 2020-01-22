export default class Shuttler<TModel>{
    model: TModel = {} as TModel;
    push: () => void;

    constructor(initialModel: TModel){
      this.writeModel(initialModel);
      this.push = () => this.writeModel(this.model);
    }

    private listeners: {(model: TModel): void; } [] = [];

    subscribe( fn: (model: TModel) => void) : () => void {
        this.listeners.push(fn);
        const unsubscribe = () => this.listeners = this.listeners.filter(singleFn => singleFn !== fn);
        return unsubscribe;
    }

    writeModel(model: TModel){
        const modelChanged = this.differentObject(this.model,model);
        if(modelChanged){
          this.model = model;
          this.listeners.map(singleFn => singleFn(model));
        }
    }

    private differentObject(oldModel: TModel, newModel: TModel) {
      return JSON.stringify(oldModel) !== JSON.stringify(newModel);
    }
}