import React, { createContext, useEffect, useReducer } from 'react';
import { ME, loginApi } from '../actions/authAction';
import { useHistory } from 'react-router-dom';
import Cookie from '../utils/Cookie';
import { toast } from 'react-toastify';
import LoadingScreen from '../components/LoadingScreen';


// import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import Button from 'react-bootstrap/Button'
const Alerts = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }
    case 'LOGIN': {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'userUpdate': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  LoginContext: () => Promise.resolve(),
  Logout: () => { },
  updateUser: () => { },
  RegisterUser: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const LoginContext = async (payload, email, password, type = 'normalLogin') => {
    if (type === 'normalLogin') {
      const response = await loginApi(payload);
      console.log("login response: ---------", response)
      if (response) {
        if (response.data.status === 200) {
          Cookie.setCookie('_token_SuperAdmin', response.data?.data?.token, 1);
          dispatch({ type: 'LOGIN', payload: response.data?.data?.userDetails })
          history.push('/user/dashboard')
          // if (response.data.data && !response.data.data.isTwoFactorAuthenticated) {
          //   history.push('/two-factor-auth')
          // }
        } else {
          toast.error(response?.data?.message);
          return response;
        }
      } else {
        toast.error("Something went wrong");
        console.log('Error');
      }
    } else {

    }
    // return body;
  };

  const Logout = () => {
    console.log("Hi")
    dispatch({ type: 'LOGOUT' });
    // document.querySelector('body').classList.toggle("fixed")
    Cookie.deleteCookie('_token_SuperAdmin')
  };

  const updateUser = (user) => {
    dispatch({ type: 'userUpdate', payload: user })

  }

  const RegisterUser = async (payload, type = 'normalRegister') => {
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = Cookie.getCookie('_token_SuperAdmin');

        if (accessToken) {
          Cookie.setCookie('_token_SuperAdmin', accessToken, 1);
          // call user details api
          const response = await ME();
          console.log(response)
          if (response.data.status === 200) {
            dispatch({
              type: 'INITIALISE',
              payload: {
                isAuthenticated: true,
                user: response.data.data
              }
            });
            console.log("Hi ", response.data.data)
          } else {
            dispatch({
              type: 'INITIALISE',
              payload: {
                isAuthenticated: false,
                user: null,
              }
            });
            Logout()
            history.push('/login')
          }


          console.log("me api res: -----", response);
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: false,
              user: null,
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        LoginContext,
        Logout,
        updateUser,
        RegisterUser,
      }}
    >
      <Stack spacing={2} sx={{ width: '100%' }}>
        {/* <Snackbar open={open} autoHideDuration={2000} 
          onClose={handleClose}
          > */}
        {/* <Alerts onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Login Successful!
            </Alerts> */}
        {/* </Snackbar> */}
      </Stack>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
