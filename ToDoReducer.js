
const toDos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]

    },
    default: return state;
  }
};

const testAddToDos = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 0,
      text: 'Learn Redux',
      completed: false
    }
  ];
  deepFreeze(stateBefore);
  deepFreeze(stateAfter);

  expect(toDos(stateBefore, action)).toEqual(stateAfter);
};

testAddToDos();
console.log('All tests passed.');
