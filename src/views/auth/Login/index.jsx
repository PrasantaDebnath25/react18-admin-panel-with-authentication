import React, { useEffect, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Validation from '../../../utils/Validation';
import TermConditionModal from '../../../components/Modals/TermConditionModal'
import useGlobalStore from "../../../hooks/useGlobalStore";
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet';
import useAuth from '../../../hooks/useAuth';
import Loader from '../../../utils/Loader';
import Reducer from '../../../services/Reducer';


const initState = {
  email: '',
  password: '',
  agree: '',
  loading: false,
  validate: false
};

const loginErrState = {
  accountnotExist: false,
  emailErrBlank: false,
  IsValidEmail: false,
  IsExistEmail: false,
  IsBlockedEmail: false,
  IsYourLoginCredentials: false,
  passErrBlank: false,
  IsValidPass: false,
  agreeErrBlank: false
};


const Login = () => {
  const { LoginContext } = useAuth();
  const history = useHistory();

  const { TOGGLE_TERM_CONDITION_MODAL, toggleForModal } = useGlobalStore();

  const [state, dispatch] = useReducer(Reducer, initState);
  const [stateForErr, dispatchForErr] = useReducer(Reducer, loginErrState);

  useEffect(() => {
    //Page Up
    // tt.success('Here is your toast.')
    // tt.error('Here is your toast.')

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);



  // const dispatch = useDispatch()

  const [togglePassword, setTogglePassword] = useState(false)

  //TermAcceptModal
  const goToTermAcceptModal = (type) => {
    dispatch({ type: "SETDATA", payload: { "name": "termConditionAcceptModalType", "value": type } })
    toggleForModal('TOGGLE_TERM_CONDITION_MODAL')
  };
  const getValidation = () => {
    return new Promise((resolve, reject) => {
      if (Validation.text(state.email.toLowerCase()) &&
        Validation.email(state.email.toLowerCase()) &&
        Validation.text(state.password)
        // &&
        // Validation.passwordCheck(state.password) 
        // state.agree

      ) {
        resolve(true)
      } else {

        if (!Validation.text(state.email.toLowerCase())) {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'emailErrBlank', value: true } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredentials', value: false } });
          console.log('email')
        } else if (!Validation.email(state.email.toLowerCase())) {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidEmail', value: true } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredentials', value: false } });
        }
        if (!Validation.text(state.password)) {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'passErrBlank', value: true } });
          console.log('password')
        }
        // else if (!Validation.passwordCheck(state.password)) {
        //   dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidPass', value: true } });
        //   console.log('password2')
        // }

        if (!state.agree) {
          dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'agreeErrBlank', value: true } });
          console.log('Agree')
        }
        resolve(false)
      }
    });
  };
  const getData = (e) => {
    if (e.target.name === "email") {

      if (!Validation.text(e.target.value.toLowerCase())) {
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'emailErrBlank', value: true } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredentials', value: false } });
        console.log('email')
      } else if (!Validation.email(e.target.value.toLowerCase())) {
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'emailErrBlank', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidEmail', value: true } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredentials', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });

      } else {

        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredentials', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'emailErrBlank', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidEmail', value: false } });
      }
    }

    if (e.target.name === "password") {
      if (!Validation.text(e.target.value)) {
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'passErrBlank', value: true } });
        //False
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidPass', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
        console.log('password')
        // } else if (!Validation.passwordCheck(e.target.value)) {
        //   dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidPass', value: true } });
        //   dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'passErrBlank', value: false } });
        //   dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
        //   console.log('password2')
      } else {
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsValidPass', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'passErrBlank', value: false } });
        dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: false } });
      }
    }

    dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'accountnotExist', value: false } });
    dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: false } });
    dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredentials', value: false } });

    if (e.target.name === "agree") {
      dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'agreeErrBlank', value: false } });
    }

    if (e.target.name === "agree") {
      dispatch({ type: "ONCHANGE_CHECKBOX", payload: e })
    } else {
      dispatch({ type: "ONCHANGE", payload: e })
    }
  }

  // Login Function
  const onLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'VALIDATE', payload: true });

    let validationStatus = await getValidation();
    if (validationStatus) {
      dispatch({ type: 'LOAD', payload: true });

      try {
        let responce = await LoginContext({ email: state.email.toLowerCase(), password: state.password });
        dispatch({ type: 'LOAD', payload: false });
        if (responce.data.status === 200) {
          history.push('/user/dashboard')
        }
        // else if (responce.data.status === 200 && responce.data.data.roles && responce.data.data.roles.length > 0 && responce.data.data.roles[0].id !== 1) {
        //   dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsYourLoginCredentials', value: true } });
        // }
        if (responce && responce.data.status === 400) {
          if (responce && responce.data.message === 'Email not verified.') {
            // history.push(`/verify-pass?id=${responce.data.id}&ps=${responce.data.passtoken}`);
          } else if (responce && (responce.data.message === 'Incorrect Password provided' || responce.data.message === 'Incorrect Email provided')) {
            dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsExistEmail', value: true } });
          } else if (responce && responce.data.message === 'EmailId not Registerd') {
            dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'accountnotExist', value: true } });
          } else if (responce && responce.data.message === 'Inactive account! Please contact administrator.') {
            dispatchForErr({ type: 'VALIDATECHECK', payload: { name: 'IsBlockedEmail', value: true } });
          }

        }

      } catch (err) {
        // history.push(`/dashboard`)
        dispatch({ type: 'LOAD', payload: false });
        console.log("Inside catch block login: ---", err);
        // toast.error("Something went wrong");
      }
    }
  };

  console.log(state)
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <>
        {TOGGLE_TERM_CONDITION_MODAL && state.termConditionAcceptModalType && <TermConditionModal type={state.termConditionAcceptModalType} />}


        <section className="beforeLoginSection">
          <div className="beforeLoginRow">
            {/* <div className="left">
              <h1>Lipsum
              </h1>
            </div> */}
            <div className="right">
              {/* <img src="../images/user.png" /> */}
              <h3>Login to Your Account</h3>
              {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p> */}
              <form
              // onSubmit={formik.handleSubmit}
              >
                <div className="fomrGroup">
                  <label>Email</label>
                  <div className="inputgroup inputgroupLeft">
                    <input
                      style={(stateForErr.emailErrBlank || stateForErr.IsValidEmail || stateForErr.accountnotExist || stateForErr.IsYourLoginCredentials) ? { border: "3px solid red" } : { border: "3px solid #ACB4E4" }}
                      type="email" name="email"
                      id="email"
                      value={state.email}
                      onChange={getData}
                      // value={formik.values.email} 
                      className="form-control" placeholder="john.doe@gmail.com"
                    //  onChange={formik.handleChange} onKeyDown={handleBlankSpace}
                    />
                    {stateForErr.emailErrBlank &&
                      <p className="error-msg">Email is required.</p>
                    }
                    {stateForErr.IsValidEmail &&
                      <p className="error-msg">Enter valid email.</p>
                    }
                    {stateForErr.accountnotExist &&
                      <p className="error-msg">This email id is not registered with us. Please signup first to login.</p>
                    }
                    {/* {
                                        formik.touched.email && formik.errors.email ? (
                                            <div className="error_txt">
                                                {formik.errors.email}
                                            </div>
                                        ) : null
                                    } */}
                    <span className="material-icons leftSide">mail</span>
                  </div>
                </div>
                <div className="fomrGroup">
                  <label>Password</label>
                  <div className="inputgroup inputgroupLeft inputgroupRight inputgroupBoth">
                    <input
                      id="password"
                      // value={state.password}
                      onChange={getData}
                      style={(stateForErr.passErrBlank || stateForErr.IsValidPass ||
                        stateForErr.IsExistEmail ||
                        stateForErr.IsBlockedEmail || stateForErr.IsYourLoginCredentials)
                        ? { border: "3px solid red" } : { border: "3px solid #ACB4E4" }}
                      type={!togglePassword ? "password" : "text"}
                      placeholder="insert your password" name="password"
                      // value={formik.values.password} 
                      className="form-control"
                    // onChange={formik.handleChange} onKeyDown={handleBlankSpace} 
                    />
                    {stateForErr.passErrBlank &&
                      <p className="error-msg">Password is required.</p>
                    }
                    {stateForErr.IsValidPass &&
                      <p className="error-msg">Please enter valid password minimum 8 characters with at least a number,
                        special character and capital letter and small letter.</p>
                    }
                    {stateForErr.IsExistEmail &&
                      <p className="error-msg">Email or password is wrong.</p>
                    }

                    {stateForErr.IsBlockedEmail &&
                      <p className="error-msg">Your account is blocked from admin.</p>
                    }
                    {stateForErr.IsYourLoginCredentials &&
                      <p className="error-msg">You don't have to access it. Contact Super Admin.</p>
                    }
                    {/* {
                                        formik.touched.password && formik.errors.password ? (
                                            <div className="error_txt">
                                                {formik.errors.password}
                                            </div>
                                        ) : null
                                    } */}
                    <span className="material-icons leftSide">lock</span>

                    <span onClick={() => setTogglePassword(!togglePassword)} style={{ cursor: "pointer" }}
                      className="rightSide">
                      {togglePassword ?
                        <img src="/images/visibility.svg" alt=""></img>
                        :
                        <img src="/images/visibility_off.svg" alt=""></img>}
                    </span>

                  </div>
                  <Link to="/forgot-password" className="infoFrgtPass">Forgot Password</Link>
                </div>
                {/* <div className="fomrGroup">
                  <div className="customCheckBox">
                    <input type="checkbox" 
                      id="agree"
                      style={(stateForErr.agreeErrBlank) ? { border: "3px solid red" } : { border: "3px solid #ACB4E4" }}
                      value={state.agree}
                      onChange={getData}
                      name="agree" />
                    <label htmlFor="html">I agree to all statesments included in terms of use</label>
                  </div>
                  {stateForErr.agreeErrBlank &&
                    <p className="error-msg">Please select it.</p>
                  }
                </div> */}
                <button onClick={onLogin} className="themeBtn fullBtn">
                  {
                    state.loading ? <Loader loaderWidth={"30px"}
                      loaderHeight={"30px"}
                      position={"relative"} /> : "Login  Now"
                  }

                </button>
              </form>
              {/* <p className="infoText"><Link to="/login">Already a Member?</Link> </p> */}
            </div>
          </div>
        </section>
        {/* */}
      </>
    </>
  );
}

export default Login;
