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
    if (parseFloat(high) <= parseFloat(low)) {
      props.setWarn("High price should larger than low price");
      return;
    }
    let data = {}
    data['limit_high'] = high
    data['limit_low'] = low
    data['user_id'] = props.user.id
    data['code'] = props.code
    if (props.monitor) {
      props.editAlert(props.monitor.id, data)
    } else {
      props.addAlert(data);
    }
    props.fetchUser(props.user.id)
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

  function deleteMonitor() {
    props.deleteAlert(props.monitor.id)
    props.fetchUser(props.user.id)
    props.flipAlertModal("MODAL_CLOSE");
    props.setWarn("");
  }


  function renderButtons() {
    if (props.monitor) {
      return (<div>
        <button class="btn btn-primary btn-name" type="submit">Edit Monitor</button>
        <button class="btn btn-danger btn-name" type="button" onClick={ deleteMonitor }>Delete Monitor</button>
        <button class="btn btn-secondary btn-name" type="button" onClick={ finishEditCoin }>Back</button>
      </div>)
    } else {
      return (
        <div>
          <button class="btn btn-primary btn-name" type="submit">Create Monitor</button>
          <button class="btn btn-secondary btn-name" type="button" onClick={ finishEditCoin }>Back</button>
        </div>
      )
    }
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
        {renderButtons()}
      </form>
  )
}

let AlertForm1 = reduxForm({
  form: 'alert'
})(AlertForm)
const selector = formValueSelector('alert')

function state2props(state) {
  return {
    user: state.auth,
    message: state.message,
    limit_low: selector(state, 'limit_low'),
    limit_high: selector(state, 'limit_high')
  }
}
export default connect(state2props, actions)(AlertForm1)
