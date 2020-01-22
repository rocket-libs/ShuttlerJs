export default class Shuttler<TModel> {
    model: TModel;
    constructor(initialModel: TModel);
    private listeners;
    subscribe(fn: (model: TModel) => void): () => void;
    push(model: TModel): void;
    private differentObject;
}
