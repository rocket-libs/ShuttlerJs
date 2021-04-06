import Shuttler from ".."



test ("listeners evaluated correctly", () => {
    const shuttler = new Shuttler<object>({})
    shuttler.subscribe((_) => {});
    shuttler.subscribe((_) => { const _x = _});
    expect(shuttler.broadcastListeners.length).toBe(2);
    expect(shuttler.hasBroadcastListeners).toBeTruthy();
});

test("listeners evaluated correctly", () => {
    const shuttler = new Shuttler<object>({})
    expect(shuttler.hasBroadcastListeners).toBeFalsy()
});