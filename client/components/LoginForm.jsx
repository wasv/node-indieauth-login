import React from 'react';
import './loginform.css';

export default (props) => {

  const [uid, setUid] = React.useState("")

  const validation_pattern = /http(s|):\/\/.+/;

  const validate = (e) => {
    if (! validation_pattern.test(uid)) {
      e.preventDefault();
    }
  }

  const onChange = (uid) => {
    setUid(uid);
  }


  return (
      <form method="post" onSubmit={(e) => validate(e)}>
         <input type="hidden" name="rd" value={props.rd} />
         <div>
             <label htmlFor="uid">Domain: </label>
             <input onChange={ (e) => onChange(e.target.value) }
                    className="login-field" type="text" name="uid" value={uid}/>
             <input className="login-button" type="submit" disabled={!validation_pattern.test(uid)} value="Log In"/>
         </div>
      </form>
  );
}
