import { connect } from "react-redux";
import { addTodo } from "../redux/actions";
import AddTodo from "../components/App/AddTodo"

// connect 的參數，是一個 function，用來指定你想要拿到的資料
const mapStateToProps = (store) => {
  return {
    todos: store.todos.todos,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (payload) => dispatch(addTodo(payload)), // 如果 props 的名稱跟 action 名稱一樣的話，可以只寫成物件
  }
}

const connectToStore = connect(mapStateToProps,mapDispatchToProps)

// 把 AddTodo 傳進去後就可以跟 redux 串起來
const ConnectedAddTodo = connectToStore(AddTodo);

// HOC higher order component ，component 在包一層 component 的感覺
// Smart component/ container，知道 redux 的存在
export default ConnectedAddTodo;

// 上面三行總結成一行
// export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);

