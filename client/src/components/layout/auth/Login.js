import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    console.log('success');
    //   const newUser ={
    //       name,
    //       email,
    //       password
    //   }
    //   try {
    //       const config = {
    //           headers: {
    //               'Content-type': 'application/json'
    //           }
    //       }
    //       const body = JSON.stringify(newUser);
    //       const res = await axios.get('api/users', body, config);
    //       console.log(res.data);
    //   } catch(err){
    //       console.error(err.response.data )
    // }
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into your Account
      </p>
      <form className="form" onSumbit={(e) => onsubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onchange={(e) => onchange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minlength="6"
            value={password}
            onchange={(e) => onchange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
