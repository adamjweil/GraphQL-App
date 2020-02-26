import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { Mutation } from 'react-apollo'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import gql from 'graphql-tag'
import { withRouter } from 'react-router'

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    email: '',
    password: '',
  }

  render() {
    const { login, email, password } = this.state
    return (
      <Paper>
        <div>
          <Grid container spacing={8} alignItems='flex-end'>
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
              <TextField
                value={email}
                id="email"
                label="email"
                type="email"
                onChange={e => this.setState({ email: e.target.value })}
                fullWidth
                autoFocus
                required />
            </Grid>
          </Grid>
          <Grid containr spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
                value={password}
                id="password"
                label="Password"
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                fullWidth
                required />
            </Grid>
          </Grid>
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <Button className="pointer mr2 button" onClick={mutation}>
                {login ? 'login' : 'create account'}
              </Button>
            )}
          </Mutation>

          <Button
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login
              ? 'need to create an account?'
              : 'already have an account?'}
          </Button>
        </div>
      </Paper>
    )
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token)
    this.props.history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
}

export default withRouter(Login)
