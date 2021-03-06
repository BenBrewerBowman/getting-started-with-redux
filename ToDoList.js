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
const AddTodo = ( props, { store } ) => {
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
AddTodo.contextTypes = {
  store: React.PropTypes.object
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

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos (
        state.todos,
        state.visibilityFilter
    )
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) =>
      store.dispatch({
        type: 'TOGGLE_TODO',
        id: id
      })
  };
}

const { connect } = ReactRedux;
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

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
    const {store} = this.context;
    const state = store.getState;

    return (
      <TodoList 
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

class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    }
  }

  render() {
    return this.props.children;
  }
}
Provider.childContextTypes = {
  store: React.PropTypes.object
}

const { createStore } = Redux;
const { Provider } = ReactRedux;

const render = () => {
    ReactDOM.render(
      <Provider store = {createStore(todoApp)}>
        <ToDoApp />
      </Provider>,
      document.getElementById('root')
    );
};

store.subscribe(render);
render();
