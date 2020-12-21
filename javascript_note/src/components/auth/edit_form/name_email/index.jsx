import React, { Fragment, useEffect, useState } from 'react';
import { Button, Field, Control, Input, Column, Section, Help, Label } from "rbx";
import { Redirect } from "react-router-dom";

import UsersServices from '../../../../services/users'

function EditForm() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState(null);

    const initializeUser = async () => {
        const user = await JSON.parse(localStorage.getItem('user'))
        setName(user['name'])
        setEmail(user['email'])
    }

    useEffect(() => {
        initializeUser()
    }, [])

    const HandleSubmit = async (evt) => {
        evt.preventDefault()
        try{
            await UsersServices.update({name: name, email: email})
            setStatus("success")
            setTimeout(() => {
                setStatus(null)
            }, 2000)
        }catch(error){
            setStatus("error")
            setTimeout(() => {
                setStatus(null)
            }, 2000)
        }
    }

  return (
    <Fragment>
        <Column.Group centered>
            <form onSubmit={HandleSubmit}>
                <Column size={12}>
                    <Field>
                        <Label size="small">Name:</Label>
                        <Control>
                        <Input 
                            type="text" 
                            required
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        </Control>
                    </Field>
                    <Field>
                        <Label size="small">Email:</Label>
                        <Control>
                        <Input 
                            type="text" 
                            required
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
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
                    {status == "error" &&
                        <Help color="danger">Problem in update</Help>
                    }
                    {status == "success" &&
                        <Help color="primary">Updated with success</Help>
                    }
                </Column>
            </form>
        </Column.Group>
    </Fragment>
  )
}

export default EditForm;