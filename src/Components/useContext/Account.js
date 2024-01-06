import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { createContext } from 'react';
import UserPool from '../../cognito/UserPool';

const AccountContext = createContext();

const Account = (props) => {

  const getSession = async () => {
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          // console.log('loginSucess', result);
          // console.log("getAccessToken")
          console.log(result.getAccessToken().getJwtToken())
          // console.log(result.getAccessToken())
    
          // console.log("getIdToken")
          console.log(result)
          resolve(result);
        },
        onFailure: (err) => {
          console.log('login failure', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('new password required', data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    user.signOut();
    window.location.href = '/';
  };

  const getUser = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      return user;
    } else {
      return null;
    }
  };

  // const GetStatusLogin2 = () => {
  //   const user = UserPool.getCurrentUser();
  //   if (user) {
  //     return user;
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout,getUser }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };