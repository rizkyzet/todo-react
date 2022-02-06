const root = document.getElementById('root');




// INPUT TO DO
function InputTodo(props){
   
    const [todo,setTodo] = React.useState('');
    const todoRef = React.createRef(null);
    
    const updateTodos = (...val)=>{
        props.dataSetTodos(val)
    }
    
    const tambahTodos  = (event)=>{
        event.preventDefault();
        const newData = {
            id:props.generateId(),
            do:todo,
            complete:false
        }
        props.dataTodos.unshift(newData)
    
        updateTodos(...props.dataTodos);
        setTodo('');
        todoRef.current.focus();
    }

    return(
    
        <form onSubmit={tambahTodos}>
            <input ref={todoRef} type="text" value={todo} onChange={function(event){
                    setTodo(event.target.value)
            }} />
            <button type="submit">Tambah</button>
        </form>

    )
    
}

// lIST TO DO
function ListTodo(props){

    const updateTodos = (...newData)=>{
        props.setTodos(newData)
    }

    const sortDataTodo = ()=>{
        props.todos.sort((a, b) => {
            return a.complete === b.complete ? 0 : a.complete ? 1 : -1
        })
    }

    const checkedTodo = ({todo,index})=>{    
        if(!todo.complete == false){
            todo.complete = !todo.complete
            props.todos.splice(index,1);
            props.todos.unshift(todo);
            updateTodos(...props.todos)
        }else{
            const newData = props.todos.map((val)=>{
                if (todo.id == val.id){
                    val.complete = !todo.complete
                }
                return val
            });
            updateTodos(...newData);
        }
    }

    const deleteTodo = (index)=>{
        props.todos.splice(index,1);
        updateTodos(...props.todos);
    }
    
    sortDataTodo()

    return (
        <ul>
            {props.todos.length > 0 ? 
            props.todos.map((val,index)=>{
                return (
                    <li className={val.complete ?'done' : undefined} key={val.id}>
                        <label htmlFor={val.id}>
                        <input type="checkbox" id={val.id}  value={val.complete} onChange={()=>{
                            checkedTodo({todo:val,index:index})
                        }} checked={val.complete ? true : false} />
                        {val.do}
                        </label>     
                    <button onClick={()=>{
                        deleteTodo(index)
                    }}>Delete</button>
                    </li>
                ) 
            })
            :
            <li>Kosong</li>
            }
        </ul>
    )

}


function App() {
    const generateId = ()=> {
        return btoa(Math.random().toString()).substr(10, 5)
    }

    const [todos,setTodos] = React.useState([
        {
            id:generateId(),
            do:'Ibadah',
            complete:true
        },
        {
            id:generateId(),
            do:'Ngegame',
            complete:false
        }
    ]);


    return (
        <>
        <h1>To Do React</h1>
            <InputTodo dataTodos={todos} dataSetTodos={setTodos} generateId={generateId}  />
            <ListTodo todos={todos} generateId={generateId} setTodos={setTodos} />
        </>
    )
}

ReactDOM.render(<App />,root);