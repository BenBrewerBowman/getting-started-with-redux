const { createStore } = Redux;
const store = createStore(todoApp);

const { Component } = React;

let nextTodoId = 0;

class ToDoApp extends Component {
    render() {
        return (
            <div>
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: 'Test',
                        id: nextTodoId++
                    });
                }}>
                    Add Todo
                </button>
            </div>
        );
    }
}


const render = () => {
    ReactDOM.render(
        <ToDoApp />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();
