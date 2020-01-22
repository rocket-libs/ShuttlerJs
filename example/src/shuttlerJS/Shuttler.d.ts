export default class Shuttler<TModel> {
    model: TModel;
    push: () => void;
    constructor(initialModel: TModel);
    private listeners;
    subscribe(fn: (model: TModel) => void): () => void;
    writeModel(model: TModel, forceOverwrite: boolean): void;
    private differentObject;
}
