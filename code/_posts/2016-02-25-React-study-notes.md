---
layout: post
title:  "React Study Notes"
date:  2016-02-25
categories: JavaScript
featured_image: /images/react.jpg
---

### Record some points when coding React

[[ React Doc ]](https://facebook.github.io/react/docs/getting-started.html)

- [[ Component Lifecycle ]](https://facebook.github.io/react/docs/working-with-the-browser.html)

- [[ Refs to Components ]](https://facebook.github.io/react/docs/more-about-refs.html)

- [[ DOM Differences ]](https://facebook.github.io/react/docs/dom-differences.html)

- [[ MORE TIP ]](https://facebook.github.io/react/tips/introduction.html)

#### Using props 

The child component will depend on data passed in from its parent.
Data passed in from a parent component is available as a 'property' on the child component. These 'properties' are accessed through `this.props`

By surrounding a JavaScript expression in braces inside JSX (as either an attribute or child), you can drop text or React components into the tree. We access named attributes passed to the component as keys on `this.props` and any nested elements as `this.props.children`.


#### Protect raw HTML from an XSS attack

If we wanna get around its protection, we can use `dangerouslySetInnerHTML={this.ourOwnFunc()}`, but the framework will warn that we should not use it.


    var Comment = React.createClass({
      rawMarkup: function() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
      },

      render: function() {
        return (
          <div className="comment">
            <h2 className="commentAuthor">
              {this.props.author}
            </h2>
            <span dangerouslySetInnerHTML={this.rawMarkup()} />
          </div>
        );
      }
    });

#### Dynamic Children

The situation gets more complicated when the children are shuffled around (as in search results) or if new components are added onto the front of the list (as in streams). In these cases where the identity and state of each child must be maintained across render passes, you can uniquely identify each child by assigning it a `key`

    render: function() {
        var results = this.props.results;
        return (
          <ol>
            {results.map(function(result) {
              return <li key={result.id}>{result.text}</li>;
            })}
          </ol>
        );
    }


#### Fetching from the serve

    <Component url="/api/data" />

#### Reactive state

Based on its props, each component has rendered itself once. props are immutable: they are passed from the parent and are "owned" by the parent. To implement interactions, we introduce mutable state to the component. `this.state` is private to the component and can be changed by calling `this.setState()`. When the state updates, the component re-renders itself.

render() methods are written declaratively as functions of this.props and this.state. The framework guarantees the UI is always consistent with the inputs.

JSX

    var Component = React.createClass({
      getInitialState: function() {
        return {data: []};
      }
    });

ES6

    class Component extends from React.Components {
      constructor(props) {
        super(props);
        this.state = {
          data: []
        }
      }
    }

##### Updating state

Here, `componentDidMount` is a method called automatically by React after a component is rendered for the first time. The key to dynamic updates is the call to `this.setState()`.

    componentDidMount: function() {
      this.setState({data: data});
    }


#### Creacte circurial animation

One common use case is a component wanting to update itself on a time interval. It's easy to use `setInterval` not `setTimeout` or `requestAnimationFrame`, cus they don't work in React...

It's important to cancel your interval when you don't need it anymore to save memory. React provides lifecycle methods that let you know when a component is about to be created or destroyed.

The below example use the `Mixin`. Unfortunately ES6 launched without any mixin support. Therefore, there is no support for mixins when you use React with ES6 classes. 

    var SetIntervalMixin = {
      componentWillMount: function() {
        this.intervals = [];
      },
      setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
      },
      componentWillUnmount: function() {
        this.intervals.forEach(clearInterval);
      }
    };

    var TickTock = React.createClass({
      mixins: [SetIntervalMixin], // Use the mixin
      getInitialState: function() {
        return {seconds: 0};
      },
      componentDidMount: function() {
        this.setInterval(this.tick, 1000); // Call a method on the mixin
      },
      tick: function() {
        this.setState({seconds: this.state.seconds + 1});
      },
      render: function() {
        return (
          <p>
            React has been running for {this.state.seconds} seconds.
          </p>
        );
      }
    });

#### Controlled components

With the traditional DOM, input elements are rendered and the browser manages the state (its rendered value). As a result, the state of the actual DOM will differ from that of the component. This is not ideal as the state of the view will differ from that of the component. In React, components should always represent the state of the view and not only at the point of initialization.

    var CommentForm = React.createClass({
      getInitialState: function() {
        return {author: '', text: ''};
      },
      handleTextChange: function(e) {
        this.setState({text: e.target.value});
      },
      render: function() {
        return (
          <form className="commentForm">
            <input
              type="text"
              placeholder="Say something..."
              value={this.state.text}
              onChange={this.handleTextChange}
            />
            <input type="submit" value="Post" />
          </form>
        );
      }
    });

    // Methods follow the same semantics as regular ES6 classes, meaning that
    // they don't automatically bind this to the instance. You'll have to
    // explicitly use .bind(this) or arrow functions =>.
    
    <input onChange={this.handleTextChange.bind(this)}/>  

#### Uncontrolled Components

An `<input>` without a value property is an uncontrolled component:

    render: function() {
      return <input type="text" />;
    }

This will render an input that starts off with an empty value. Any user input will be immediately reflected by the rendered element. If you wanted to listen to updates to the value, you could use the onChange event just like you can with controlled components.

An uncontrolled component maintains its own internal state.

#### Default Value

`<input type="checkbox">` and `<input type="radio">` support `defaultChecked`, and `<select>` supports `defaultValue`.

#### Callbacks as props

    var Parent = React.createClass({

      handleCallback: function(data) {
          // TODO: submit to the server and refresh the list
      },
      
      // ...

      render: function() {
          return (
            <div>
                <Child onSomethingChange={this.handleCallback} />
            </div>
          );
      }

    });

    var Child = React.createClass({
      handleSomthing: function(data) {
        this.props.onSomethingChange(data);
      }

      // ...

      render: function() {
        return (
          <input onChange={handleSomething} />
        )
      }
    });

    














