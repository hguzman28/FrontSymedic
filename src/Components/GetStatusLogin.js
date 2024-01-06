import { useContext, useEffect, useState } from 'react';
import { AccountContext } from './useContext/Account';

export const GetStatusLogin = () => {

    const [status, setStatus] = useState(false);
    const { getSession } = useContext(AccountContext);
  
    useEffect(() => {
      getSession()
        .then((session) => {
          console.log('Session: ', session);
          setStatus(true);
        })
        .catch((err) => {
          console.log('Session: ', err);
          setStatus(false);
        });
    }, [status]);


  return {
    status,

  }
    


}
