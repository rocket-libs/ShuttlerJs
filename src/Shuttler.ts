/**
 * Contain class for listener functions, that allows then to be paired with a unique hash code.
 */
export class Listener<TModel>{
  /**
   * Value that uniquely identifies a listener
   */
  hashCode: number;

  /**
   * The listener callback function.
   */
  fn: (model: TModel) => void; 

  constructor(hashCode: number, fn: (model: TModel) => void){
    this.hashCode = hashCode;
    this.fn = fn;
  }

}

/**
 * A simple class to store a model, register callback functions or listeners to notify subscribers of changes to the model.
 * This class also provides as set of methods to broadcast changes.
 */
export default class Shuttler<TModel>{
    public model: TModel = {} as TModel;
    push: () => void;

    /**
     * 
     * @param initialModel The initial model, with its initial values
     */
    constructor(initialModel: TModel){
      this.writeModel(initialModel);
      this.push = () =>  {
         this.writeModel(this.model);
      }
    }

    private _listeners: Listener<TModel>[] = [];

    public get broadcastListeners() : Listener<TModel>[] {
      return this._listeners;
    }

    public get hasBroadcastListeners() : boolean {
      return this.broadcastListeners 
        && Array.isArray(this.broadcastListeners)
        && this.broadcastListeners.length > 0;
    }

    /**
     * This method allows you to add a listener for changes to the model.
     * Be sure to add at least one listener, otherwise you'll have no way of knowing your model has changed.
     * The call to 'subscribe' returns a callback function which can be used to clean up the subscription.
     * @param fn the function to be called to notify the subscriber that the model changed.
     */
    public subscribe( fn: (model: TModel) => void) : () => void {
        const hashCode = this.getHashCode(fn);
        const notYetSubscribed = this.subscriptionAlreadyExists(hashCode) === false;
        if(notYetSubscribed){
          this._listeners.push(new Listener<TModel>(hashCode,fn));
          const unsubscribe = () => {
            const candidates = this._listeners.filter(singleListener => singleListener.hashCode === hashCode);
            if(candidates.length > 1){
              throw new Error(`Multiple listeners with hashcode '${hashCode}' were found subscribing to model change notifications. This is abnormal and is possibly a bug.`);
            }else if(candidates.length === 1){
              this._listeners.splice(this._listeners.indexOf(candidates[0]),1);
              delete candidates[0];
              candidates.splice(0,1);
            }
            
          }
          return unsubscribe;
        }else{
          const noOp : () => void = () => {};
          return noOp;
        }
    }

    /**
     * Checks that the model has changed, and if so, persists new changes and notifies subscribers.
     * @param model The model that bears changed information.
     */
    public writeModel(model: TModel){
        const modelChanged = this.differentObject(this.model,model);
        if(modelChanged){
          this.model = model;
          this.broadcastModelChanged();
        }
    }

    /**
     * This method broadcasts to all listeners that the model changed.
     */
    public broadcastModelChanged() {
      this._listeners.map(singleListener => singleListener.fn(this.model));
    }

    private differentObject(oldModel: TModel, newModel: TModel) {
      return JSON.stringify(oldModel) !== JSON.stringify(newModel);
    }
    
    private subscriptionAlreadyExists(hasCode: number) : boolean {
      const candidates = this._listeners.filter(singleListener => singleListener.hashCode === hasCode);
      return candidates.length === 1;
    }


    private getHashCode(fn: (model: TModel) => void) : number {
      const stringValue = fn.toString();
      var hashCode = 0, i, chr;
      if (stringValue.length === 0) return hashCode;
      for (i = 0; i < stringValue.length; i++) {
        chr   = stringValue.charCodeAt(i);
        hashCode  = ((hashCode << 5) - hashCode) + chr;
        hashCode |= 0;
      }
      return hashCode;
    }
}