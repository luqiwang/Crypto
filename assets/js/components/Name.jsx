import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import * as actions from '../actions'
import { connect } from 'react-redux';
import React from 'react';
import NameForm from './NameForm'

function Name(props) {
  return (
    <div>
      <Modal isOpen={props.user.name == null || props.message.profileMessage}>
       <ModalHeader>Input Your Name</ModalHeader>
         <ModalBody>
           <NameForm  user={props.user}/>
         </ModalBody>
         <ModalFooter>
         </ModalFooter>
       </Modal>
    </div>
  )
}
export default connect(null, actions)(Name)
