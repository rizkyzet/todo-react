const root = document.getElementById('root'); // INPUT TO DO

function InputTodo(props) {
  const [todo, setTodo] = React.useState('');
  const todoRef = React.createRef(null);

  const updateTodos = (...val) => {
    props.dataSetTodos(val);
  };

  const tambahTodos = event => {
    event.preventDefault();
    const newData = {
      id: props.generateId(),
      do: todo,
      complete: false
    };
    props.dataTodos.unshift(newData);
    updateTodos(...props.dataTodos);
    setTodo('');
    todoRef.current.focus();
  };

  return /*#__PURE__*/React.createElement("form", {
    onSubmit: tambahTodos
  }, /*#__PURE__*/React.createElement("input", {
    ref: todoRef,
    type: "text",
    value: todo,
    onChange: function (event) {
      setTodo(event.target.value);
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Tambah"));
} // lIST TO DO


function ListTodo(props) {
  const updateTodos = (...newData) => {
    props.setTodos(newData);
  };

  const sortDataTodo = () => {
    props.todos.sort((a, b) => {
      return a.complete === b.complete ? 0 : a.complete ? 1 : -1;
    });
  };

  const checkedTodo = ({
    todo,
    index
  }) => {
    if (!todo.complete == false) {
      todo.complete = !todo.complete;
      props.todos.splice(index, 1);
      props.todos.unshift(todo);
      updateTodos(...props.todos);
    } else {
      const newData = props.todos.map(val => {
        if (todo.id == val.id) {
          val.complete = !todo.complete;
        }

        return val;
      });
      updateTodos(...newData);
    }
  };

  const deleteTodo = index => {
    props.todos.splice(index, 1);
    updateTodos(...props.todos);
  };

  sortDataTodo();
  return /*#__PURE__*/React.createElement("ul", null, props.todos.length > 0 ? props.todos.map((val, index) => {
    return /*#__PURE__*/React.createElement("li", {
      className: val.complete ? 'done' : undefined,
      key: val.id
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: val.id
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      id: val.id,
      value: val.complete,
      onChange: () => {
        checkedTodo({
          todo: val,
          index: index
        });
      },
      checked: val.complete ? true : false
    }), val.do), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        deleteTodo(index);
      }
    }, "Delete"));
  }) : /*#__PURE__*/React.createElement("li", null, "Kosong"));
}

function App() {
  const generateId = () => {
    return btoa(Math.random().toString()).substr(10, 5);
  };

  const [todos, setTodos] = React.useState([{
    id: generateId(),
    do: 'Ibadah',
    complete: true
  }, {
    id: generateId(),
    do: 'Ngegame',
    complete: false
  }]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "To Do React"), /*#__PURE__*/React.createElement(InputTodo, {
    dataTodos: todos,
    dataSetTodos: setTodos,
    generateId: generateId
  }), /*#__PURE__*/React.createElement(ListTodo, {
    todos: todos,
    generateId: generateId,
    setTodos: setTodos
  }));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);