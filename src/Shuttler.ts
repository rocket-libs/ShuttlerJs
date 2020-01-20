export default class Shuttler<TModel>{
    model: TModel = {} as TModel;

    constructor(initialModel: TModel){
      this.push(initialModel);
    }

    listners: {(model: TModel): void; } [] = [];

    subscribe( fn: (model: TModel) => void) : () => void {
        this.listners.push(fn);
        const unsubscribe = () => this.listners = this.listners.filter(singleFn => singleFn !== fn);
        return unsubscribe;
    }

    push(model: TModel){
        const modelChanged = this.differentObject(this.model,model);
        if(modelChanged){
          this.model = model;
          this.listners.map(singleFn => singleFn(model));
        }
    }

    private differentObject(oldModel: TModel, newModel: TModel) {
      return JSON.stringify(oldModel) !== JSON.stringify(newModel);
    }
}