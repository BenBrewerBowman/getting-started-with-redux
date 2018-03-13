const { createStore } = Redux;
const store = createStore(todoApp);

const { Component } = React;

const Footer = ({
  visibilityFilter,
  onFilterClick
}) => {
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
      currentFilter={visibilityFilter}
      onClick={onFilterClick}
    >
      Completed
    </FilterLink>
  </p>
}

const FilterLink = ({
  filter,
  currentFilter,
  children,
  onClick
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick(filter);
      }}
    >
      {children}
    </a>
  );
}


const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li 
    onClick={onClick}
    style={{
      textDecoration: completed? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
);

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
  }
}

let nextTodoId = 0;
const ToDoApp = ({
  todos,
  visibilityFilter
}) = (
  <div>
      <input ref={node => {
        this.input = node;
      }} />
      <button onClick={() => {
          store.dispatch({
              type: 'ADD_TODO',
              text: this.input.value,
              id: nextTodoId++
          });
          this.input.value = '';
      }}>
          Add Todo
      </button>
      <TodoList
        todos={
          getVisibleTodos(
            todos,
            visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
      <Footer
        visibilityFilter={visibilityFilter}
        onFilterClick={}
      />
  </div>
);


const render = () => {
    ReactDOM.render(
        <ToDoApp
          {...store.getState()}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();
