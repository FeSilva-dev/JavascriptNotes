import React, { useState } from 'react'
import HeaderEdit from '../../../components/header_edit'
import { Column, Section, Title, Container, Card, Button } from 'rbx'
import EditForm from '../../../components/auth/edit_form/name_email/index'
import EditFormPassword from '../../../components/auth/edit_form/password/index'
import '../../../styles/users.scss'
import UsersServices from '../../../services/users'
import { Redirect } from 'react-router-dom'

const EditScreen = () => {
    const [redirectToHome, setRedirectToHome] = useState(false)

    const DeleteAccount = async () => {
        UsersServices.delete()
        setRedirectToHome(true)
    }

    if(redirectToHome)
    return <Redirect to={{pathname: "/"}} />

    return(
        <div className="note">
            <HeaderEdit />
                <Section size="medium" className="users">
                    <Container>
                        <Column.Group centered className="users-edit">
                            <Column size={4}>
                                <Title size={5} className="has-text-grey has-text-left">
                                    Informações Pessoais
                                </Title>
                                <Card>
                                    <Card.Content>
                                        <EditForm />
                                    </Card.Content>
                                </Card>
                            </Column>
                        </Column.Group>

                        <Column.Group centered className="users-edit">
                            <Column size={4}>
                                <Title size={5} className="has-text-grey has-text-left">
                                    Password
                                </Title>
                                <Card>
                                    <Card.Content>
                                        <EditFormPassword />
                                    </Card.Content>
                                </Card>
                            </Column>
                        </Column.Group>
                        <Column.Group centered>
                            <Column size={4} className="has-text-right">
                                <Button className="is-center" color="custom-purple" outlined onClick={() => DeleteAccount()} >Delete account</Button>
                            </Column>
                        </Column.Group>
                    </Container>
                </Section>
        </div>
    );
}

export default EditScreen