import React from 'react';
import { Container, Grid } from '@material-ui/core';
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Actor from './pages/Actor/Index'
import Film from './pages/Film/Film'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';


function App() {
  return (
    <Container className="top_60">
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <Sidebar />
        </Grid>
        <Grid item xs>
          <Router>
            <Header />
            <div className="main-content container_shadow">
              <Switch>
                <Route path="/film">
                  <Film />
                </Route>
                <Route path="/">
                  <Actor />
                </Route>
              </Switch>
            </div>
          </Router>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
