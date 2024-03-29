import React, { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import useAuth from "../../hooks/useAuth";
import useGlobalStore from "../../hooks/useGlobalStore";
import LoadingScreen from '../LoadingScreen';
import { TermCondition , PrivacyCondition } from '../../actions/commonAction';
import Reducer from '../../services/Reducer';


const initState = {
  termAndAccept: '',
  loading: false,
  validate: false
};



const TermConditionModal = (props) => {

  const { TOGGLE_TERM_CONDITION_MODAL, toggleForModal } = useGlobalStore();
  const [state, dispatch] = useReducer(Reducer, initState);
  const history = useHistory();
  const { user } = useAuth();

  const handleClose = () => toggleForModal('TOGGLE_TERM_CONDITION_MODAL')//dispatch({ type: 'TOGGLE_TERM_CONDITION_MODAL' });
  const handleNotClose = () => console.log("Not Close Modal")


  useEffect(() => {
    // if(props.type === 'term'){
    //   // termConditionData()
    // }else{
    //   // privacyConditionData()
    // }
    console.log(props)
  }, [props])
  const termConditionData = async () => {
    dispatch({ type: 'LOAD', payload: true });
    let response = await TermCondition();
    if (response && response.data.status === 200 ) {
      dispatch({ type: 'LOAD', payload: false });
      dispatch({ type: "SETDATA", payload: { "name": "termAndAccept", "value": response.data.terms } })
    } else {
      dispatch({ type: 'LOAD', payload: false });
    }
  }
  const privacyConditionData = async () => {
    dispatch({ type: 'LOAD', payload: true });
    let response = await PrivacyCondition();
    if (response && response.data.status === 200 ) {
      dispatch({ type: 'LOAD', payload: false });
      dispatch({ type: "SETDATA", payload: { "name": "termAndAccept", "value": response.data.terms } })
    } else {
      dispatch({ type: 'LOAD', payload: false });
    }
  }

  console.log(state)
  return (
    <div>
      { state.loading ?  <LoadingScreen /> :
      <Modal show={TOGGLE_TERM_CONDITION_MODAL} onHide={handleNotClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered scrollable className="customModal1 termsCondition__modal"
      >
        <Modal.Header>
          <h5 className="modal-title">{props && props.type}{state.termAndAccept && state.termAndAccept.title}</h5>
          <button type="button" className="customModal1-close" onClick={handleClose}>
            <img src="/images/modaclosebtn.svg" alt="" />
          </button>
        </Modal.Header>
        <Modal.Body>
        
          {state.termAndAccept &&
          <div className="termsCondition__modal_wrapper" dangerouslySetInnerHTML={{ __html: state.termAndAccept.content }}>
          
          </div>}
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="themeBtnBlue" onClick={handleClose}>Read It</button>
        </Modal.Footer>
      </Modal>}
    </div>
  );
}

export default TermConditionModal;