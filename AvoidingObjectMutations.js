
const toggleToDo = (toDo) => {
  return Object.assign({}, toDo, { completed: !toDo.completed });
};

const testToggleToDo = () => {
  const toDoBefore = {
    id: 0,
    text: "Learn redux",
    completed: false
  };
  const toDoAfter = {
    id: 0,
    text: "Learn redux",
    completed: true
  };

  deepFreeze(toDoBefore);

  expect(toggleToDo(toDoBefore)).toEqual(toDoAf)
};

testToggleToDo();
console.log("All tests passed");
