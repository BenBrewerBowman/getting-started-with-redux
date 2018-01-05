
// add counter
const addCounter = (list) => {
  return [...list, 0];
};

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(addCounter(listBefore)).toEqual(listAfter);
};

// remove counter
const removeCounter = (list, index) => {
  return [ ...list.slice(0, index), ...list.slice(index + 1) ];
};

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};

// increment Counter
const incrementCounter = (list, index) => {
  // increment array at index by 1
  return [...list.slice(0, index), list[index + 1], ...list.slice(index + 1)];
};

const testIncrementCounter = () => {
  listBefore = [0, 10, 20];
  listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
}

// run each test
testAddCounter();
testRemoveCounter();
testIncrementCounter();
Console.log("All tests passed.");
