import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateSearch, getRecentQuestions } from './actions';
import DevDashboard from './components/DevDashboard';
import Navbar from './components/Navbar';
import Home from './components/Home';

class App extends Component {
  appStyles = {
    fontFamily: 'Roboto',
    height: '100vh',
    overflow: 'hidden'
  }

  noMatchStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }

  noMatch = () => {
    return (
      <div style={this.noMatchStyles} className='text-center'>
        <h1>404</h1>
        <h3>the resource you are looking for does not exist</h3>
        <Link to='/' className='btn btn-primary'>Home</Link>
      </div>
    )
  }

  render() {
    return (
      <div className="App" style={this.appStyles}>
        <Navbar
          updateSearch={this.props.updateSearch}
          getRecentQuestions={this.props.getRecentQuestions}
        />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dev/dashboard" component={DevDashboard} />
            <Route path='*' component={this.noMatch} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { updateSearch, getRecentQuestions })(App);
