/* eslint-disable */
class Shuttler {
    constructor(initialModel) {
        this.model = {};
        this.listeners = [];
        this.writeModel(initialModel, true);
        this.push = () => this.writeModel(this.model, true);
    }
    subscribe(fn) {
        this.listeners.push(fn);
        const unsubscribe = () => this.listeners = this.listeners.filter(singleFn => singleFn !== fn);
        return unsubscribe;
    }
    writeModel(model, forceOverwrite) {
        const modelChanged = forceOverwrite || this.differentObject(this.model, model);
        if (modelChanged) {
            this.model = model;
            this.listeners.map(singleFn => singleFn(model));
        }
    }
    differentObject(oldModel, newModel) {
        return JSON.stringify(oldModel) !== JSON.stringify(newModel);
    }
}

export default Shuttler;
