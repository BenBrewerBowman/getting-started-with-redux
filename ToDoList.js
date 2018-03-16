const { createStore } = Redux;
const store = createStore(todoApp);

const { Component } = React;

const Footer = () => {
  <p>
    Show:
    {' '}
    <FilterLink
      filter='SHOW_ALL'
    >
      All
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_ACTIVE'
    >
      Active
    </FilterLink>
    {' '}
    <FilterLink
      filter='SHOW_COMPLETED'
    >
      Completed
    </FilterLink>
  </p>
}

const Link = ({
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
}

class FilterLink extends Component {

  componentDidMount() {
    this.unsuscribe = store.subscribe(() => {
      this.forceUpdate()
    });
  }

  componentWillUnmount() {
    store.unsuscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState;

    return(
      <Link
        active = {props.filter === state.visibilityFilter}
        onClick = {() => 
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        }
      > 
        {props.children}
      </Link>

    );
  }
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

let nextTodoId = 0;
const AddTodo = () => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        store.dispatch({
            type: 'ADD_TODO',
            text: input.value,
            id: nextTodoId++
        });
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
}

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

class VisibleTodoList extends Component {

  componentDidMount() {
    this.unsuscribe = store.subscribe(() => {
      this.forceUpdate()
    });
  }

  componentWillUnmount() {
    store.unsuscribe();
  }

  render() {
    const props = this.props;
    const state = store.getState;

    return (
      <TodoList 
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={ id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id: id
          })

        }
      />
    );
  }
}


const ToDoApp = ({
  todos,
  visibilityFilter
}) = (
  <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
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
