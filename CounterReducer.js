
const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// increment
expect (
  counter(0, { type: 'INCREMENT'})
).toEqual(1);

expect (
  counter(1, { type: 'INCREMENT'})
).toEqual(2);

// decrement
expect (
  counter(2, { type: 'DECREMENT'})
).toEqual(1);

expect (
  counter(1, { type: 'DECREMENT'})
).toEqual(0);

// default
expect (
  counter(1, { type: 'SOMETHING_ELSE'})
).toEqual(0);

//undefined
expect (
  counter(undefined, {})
).toEqual(0);
