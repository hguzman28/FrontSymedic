import { useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AccountContext } from '../useContext/Account';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { authenticate } = useContext(AccountContext);

  const onSubmit = (e) => {
    e.preventDefault();
    authenticate(username, password)
      .then((data) => {
      //  console.log(data.getAccessToken().idToken);
        // alert('login success');
        toast.success("LogIn exitoso");
       // window.location.reload();
       window.location.href = '/Dashboard';
      })
      .catch((err) => {
        // console.log(err);
        alert('login failure');
        // toast.error("LogIn fallido");
      });
  };

  return (
    

    <div>
      <ToastContainer />

      <section className="vh-100 gradient-custom" >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" >
                <div className="card-body p-5 text-center">

                  <form className='mb-5'  onSubmit={onSubmit}>

                    <h2 className="mb-5">Login</h2>
                    <p className=" mb-5">Por favor, digite su usuario y clave</p>

                    <div className="form-outline mb-4">
                    
                        <input
                          className='form-control form-control-lg'
                          placeholder='Usuario'
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        
                    </div> 

                    <div className="form-outline mb-4"> 
                        
                        <input
                          className='form-control form-control-lg'
                          placeholder='Clave'
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        
                      
                    </div>  

                    <div class="col-12">
                      <button type="submit" className="btn btn-primary btn-lg btn-block">Login</button>
                    </div> 

                  </form>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
 </div>
 

  );
}

export default Login;