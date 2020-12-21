import React, { Fragment, useState } from 'react';
import { Button, Field, Control, Input, Column, Icon, Help, Label } from "rbx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import UsersServices from '../../../../services/users'

function EditFormPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassowrd, setConfirmPassword] = useState("");
    const [status, setStatus] = useState(null);
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

    const HandleSubmit = async (evt) => {
        evt.preventDefault()
        console.log(password, confirmPassowrd)
        if(password == confirmPassowrd){
            await UsersServices.updatePassword({password: password})
            setStatus("success")
            setTimeout(() => {
                setStatus(null)
            }, 2000)
        }else{
            setStatus("error")
            setTimeout(() => {
                setStatus(null)
            }, 2000)
        }
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const toggleConfirmPasswordVisiblity = () => {
        setConfirmPasswordShown(confirmPasswordShown ? false : true);
    };

  return (
    <Fragment>
        <Column.Group centered>
            <form onSubmit={HandleSubmit}>
                <Column size={12}>
                    <Field>
                        <Label size="small">Password:</Label>
                        <Control>
                        <Input 
                            className="password"
                            type={passwordShown ? "text" : "password"}
                            required
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <FontAwesomeIcon cursor="pointer" icon={passwordShown ? faEye : faEyeSlash} onClick={togglePasswordVisiblity}/>
                        </Control>
                    </Field>
                    <Field>
                        <Label size="small">Confirm password:</Label>
                        <Control>
                        <Input 
                            className="confirmPassword"
                            type={confirmPasswordShown ? "text" : "password"} 
                            required
                            name="password"
                            value={confirmPassowrd}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <FontAwesomeIcon cursor="pointer" icon={confirmPasswordShown ? faEye : faEyeSlash} onClick={toggleConfirmPasswordVisiblity}/>
                        </Control>
                    </Field>
                    <Field>
                        <Control>
                        <Column.Group breakpoint="mobile">
                            <Column> 
                                <Button className="is-center" color="custom-purple" outlined>Change</Button>
                            </Column>
                        </Column.Group>
                        </Control>
                    </Field>
                    {status =="error" && 
                        <Help color="danger">Password do not match</Help>
                    }
                    {status =="success" && 
                        <Help color="primary">Updated with success</Help>
                    }
                </Column>
            </form>
        </Column.Group>
    </Fragment>
  )
}

export default EditFormPassword;