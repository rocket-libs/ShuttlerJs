/* eslint-disable */
class Shuttler {
    constructor(initialModel) {
        this.model = {};
        this.listners = [];
        this.push(initialModel);
    }
    subscribe(fn) {
        this.listners.push(fn);
        const unsubscribe = () => this.listners = this.listners.filter(singleFn => singleFn !== fn);
        return unsubscribe;
    }
    push(model) {
        const modelChanged = this.differentObject(this.model, model);
        if (modelChanged) {
            this.model = model;
            this.listners.map(singleFn => singleFn(model));
        }
    }
    differentObject(oldModel, newModel) {
        return JSON.stringify(oldModel) !== JSON.stringify(newModel);
    }
}

export default Shuttler;
