export function startFetchSingleMuppet() {
  return {
    type: "FETCH_MUPPET",
  }
}

export function fulfillFetchSingleMuppet(muppet) {
  return {
    type: "FETCH_MUPPET_FULFILLED",
    payload: muppet
  }
}

export function rejectFetchSingleMuppet(err) {
  return {
    type: "FETCH_MUPPET_REJECTED",
    payload: err
  }
}