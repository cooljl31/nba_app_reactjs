import React, { Component } from 'react';
import './layout.css';

import Header from '../../components/Header/header'
import Footer from '../../components/Footer/footer'

class Layout extends Component {
  state = {
    showNav:false
  }

  togglesSideNav = (action) => {
    this.setState({
      showNav:action
    })
  }

  render() {
    return (
      <div>
        <Header
          showNav={this.state.showNav}
          onHideNav={() => this.togglesSideNav(false)}
          onOpenNav={() => this.togglesSideNav(true)}
        />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default Layout;