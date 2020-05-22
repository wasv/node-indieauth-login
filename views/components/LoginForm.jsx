import React from 'react';

export default (props) => {

  const [uid, setUid] = React.useState()

  const validate = () => {
    return uid.test(/https?:\/\//);
  }

  return (
      <form action="/login" method="post" onSubmit={validate}>
         <input type="hidden" name="redirect_to" value={props.redirect_to} />
         <div>
             <label htmlFor="uid">Domain: </label>
             <input onChange={ (e) => setUid(e.target.value) }
                    className="login-field" type="text" name="uid" value={uid}/>
         </div>
         <div>
             <input className="login-button" type="submit" value="Log In"/>
         </div>
      </form>
  );
}
