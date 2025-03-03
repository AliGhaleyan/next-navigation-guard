export const navigationGuardHandleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = ""; // Required for browser prompt
}