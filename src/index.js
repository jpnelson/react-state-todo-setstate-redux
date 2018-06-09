import * as React from "react";
import * as ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import Input from "./components/Input";
import List from "./components/List";

import { addTodo, markTodoDone, markTodoNotDone } from "./actions";
import reducer from "./reducers";

class App extends React.Component {
  constructor(props) {
    super(props);

    // We bind `this` to the handlers
    // See https://reactjs.org/docs/handling-events.html
    this.handleCreate = this.handleCreate.bind(this);
    this.itemClick = this.itemClick.bind(this);
  }

  // handleCreate is passed down to the input below, and is called with the text of the item we want to create
  handleCreate(text) {
    this.props.addTodo(text);
  }

  // Called when an item is clicked, passed down into the items themselves
  itemClick(id, done) {
    if (done) {
      this.props.markTodoDone(id);
    } else {
      this.props.markTodoNotDone(id);
    }
  }

  render() {
    return (
      <div>
        <Input onCreate={this.handleCreate} />
        <List
          title="To do"
          items={this.props.items.filter(item => !item.done)}
          onItemClick={this.itemClick}
        />
        <List
          title="Done"
          items={this.props.items.filter(item => item.done)}
          onItemClick={this.itemClick}
        />
      </div>
    );
  }
}

// When we `connect` below, we get a component that is linked to the store.
// When an action happens that modifies the state that we care about,
// the `items` prop will change, and our component will re-render.
const mapStateToProps = state => ({
  items: state.items
});

// We could use bindactioncreators, but instead we create our own props,
// which the `App` component will receive. When these functions are called,
// they will modify the state by dispatching the "Actions" that we create.
const mapDispatchToProps = dispatch => ({
  addTodo: text => dispatch(addTodo(text)),
  markTodoDone: id => dispatch(markTodoDone(id)),
  markTodoNotDone: id => dispatch(markTodoNotDone(id))
});

// In order to get access to our special props (the todo items, and
// the functions that modify them) we must wrap our component with this `connect`
// higher order component.
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

// We create a store that knows about our reducers. When actions happen, we pass
// them to our reducers, which eventually modify the store.
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("app")
);
