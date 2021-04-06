import Shuttler from ".."



test ("listeners evaluated correctly", () => {
    const shuttler = new Shuttler<object>({})
    shuttler.subscribe((_) => {});
    expect(shuttler.hasBroadcastListeners).toBeTruthy();
});

test("listeners evaluated correctly", () => {
    const shuttler = new Shuttler<object>({})
    expect(shuttler.hasBroadcastListeners).toBeFalsy()
});