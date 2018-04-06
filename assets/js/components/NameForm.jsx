import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import * as actions from '../actions'
import { connect } from 'react-redux';
import React from 'react';
import { Redirect } from 'react-router-dom';

let NameForm = props => {
  const submitName = () => {
    props.addName(props.user.id, props.name)
    return <Redirect to="/monitor" push={true} />
  }
  return (
    <form onSubmit={props.handleSubmit(submitName)}>
      <div>
       <label htmlFor="name">Name</label>
       <Field name="name" component="input" type="text" />
     </div>
      <button type="submit">Submit</button>
    </form>
  )
}
let NameForm1 = reduxForm({
  form: 'name'
})(NameForm)
const selector = formValueSelector('name')
function state2props(state) {
  return {name: selector(state, 'name')}
}
export default connect(state2props, actions)(NameForm1)
