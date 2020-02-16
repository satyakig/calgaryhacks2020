export function newState(currentState, stateChanges) {
  const understoodChanges = {};
  const validKeys = Object.keys(currentState);

  // Guards against setting a property to undefined from the changes.
  for (const key in stateChanges) {
    if (stateChanges[key] !== undefined && validKeys.includes(key)) {
      understoodChanges[key] = stateChanges[key];
    }
  }

  const ret = new currentState.constructor();

  return Object.assign(ret, currentState, understoodChanges);
}
