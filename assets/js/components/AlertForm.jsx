import { Field, reduxForm, formValueSelector } from 'redux-form'
import * as actions from '../actions'
import { connect } from 'react-redux';
import React from 'react';
import { Redirect } from 'react-router-dom';



function AlertForm(props) {

  const submitAlert = () => {
    let high = props.limit_high
    let low = props.limit_low
    if (!high || !low) {
      props.setWarn("Input field can not be empty");
      return;
    }
    if (!isNumber(high) || !isNumber(low)) {
      props.setWarn("Input must be number");
      return;
    }
    if (high <= low) {
      props.setWarn("High price should larger than low price");
      return;
    }
    let data = {}
    data['limit_high'] = high
    data['limit_low'] = low
    data['user_id'] = props.user.id
    data['code'] = props.code
    console.log("DATA",data)
    props.addAlert(data);
    props.flipAlertModal("MODAL_CLOSE");
    props.setWarn("");
  }

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function finishEditCoin() {
    props.flipAlertModal("MODAL_CLOSE");
    props.setWarn("");
  }

  return (
      <form onSubmit={props.handleSubmit(submitAlert)}>
        <div>
         <label htmlFor="limit_high">Please input high threshold price</label>
         <Field class="form-control" name="limit_high" component="input" type="text" />
       </div>
       <div>
        <label htmlFor="limit_low">Please input low threshold price</label>
        <Field class="form-control" name="limit_low" component="input" type="text" />
      </div>
        <p className='warn'>{props.message.nameMessage}</p>
        <button class="btn btn-secondary btn-cancel" type="button" onClick={ finishEditCoin }>Cancel</button>
        <button class="btn btn-primary btn-name" type="submit">Submit</button>
      </form>
  )
}

let AlertForm1 = reduxForm({
  form: 'alert'
})(AlertForm)
const selector = formValueSelector('alert')

function state2props(state) {
  console.log("ALERT", state)
  return {
    user: state.auth,
    message: state.message,
    limit_low: selector(state, 'limit_low'),
    limit_high: selector(state, 'limit_high')
  }
}
export default connect(state2props, actions)(AlertForm1)
