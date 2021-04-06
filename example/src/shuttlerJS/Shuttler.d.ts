/**
 * A simple class to store a model, register callback functions or listeners to notify subscribers of changes to the model.
 * This class also provides as set of methods to broadcast changes.
 */
export default class Shuttler<TModel> {
    model: TModel;
    push: () => void;
    /**
     *
     * @param initialModel The initial model, with its initial values
     */
    constructor(initialModel: TModel);
    private listeners;
    /**
     * Allows you to check if any listeners are configured for broadcast of changes
     */
    get hasBroadcastListeners(): boolean;
    /**
     * This method allows you to add a listener for changes to the model.
     * Be sure to add at least one listener, otherwise you'll have no way of knowing your model has changed.
     * The call to 'subscribe' returns a callback function which can be used to clean up the subscription.
     * @param fn the function to be called to notify the subscriber that the model changed.
     */
    subscribe(fn: (model: TModel) => void): () => void;
    /**
     * Checks that the model has changed, and if so, persists new changes and notifies subscribers.
     * @param model The model that bears changed information.
     */
    writeModel(model: TModel): void;
    /**
     * This method broadcasts to all listeners that the model changed.
     */
    broadcastModelChanged(): void;
    private differentObject;
    private subscriptionAlreadyExists;
    private getHashCode;
}
