import { Field, reduxForm, formValueSelector } from 'redux-form'
import * as actions from '../actions'
import { connect } from 'react-redux';
import React from 'react';
import { Redirect } from 'react-router-dom';



function NameForm(props) {

  const submitName = () => {
    if(!props.name || props.name.trim() == ""){
      props.setWarn("Name can not be blank");
      return;
    }
    props.addName(props.user.id, props.name)
    props.setName(false);
    return <Redirect to="/" push={true} />
  }

  return (
      <form onSubmit={props.handleSubmit(submitName)}>
        <div>
         <label htmlFor="name">Please input your name</label>
         <Field class="form-control" name="name" component="input" type="text" />
       </div>
       <span className='warn'>{props.message.nameMessage}</span>
        <button class="btn btn-primary btn-name" type="submit">Submit</button>
      </form>
  )
}

let NameForm1 = reduxForm({
  form: 'name'
})(NameForm)
const selector = formValueSelector('name')

function state2props(state) {
  return {
    initialValues: {
      name: state.auth.name
    },
    message: state.message,
    name: selector(state, 'name')
  }
}
export default connect(state2props, actions)(NameForm1)
