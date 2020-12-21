import React from 'react'
import Header from '../../../components/header'
import { Column, Section, Title, Container, Card } from 'rbx'
import logoImage from '../../../assets/images/logo.png'
import '../../../styles/register.scss'

import LoginForm from '../../../components/auth/login_form'


const LoginScreen = () => {
    return(
        <div className="note">
            <Header />
            <Section size="medium" className="auth">
                <Container>
                    <Column.Group centered>
                        <Column size={3}>
                            <Card>
                                <Card.Content>
                                    <Section>
                                        <Column.Group centered>
                                            <Column size={12}>
                                                <img src={logoImage}/>
                                            </Column>
                                        </Column.Group>

                                        <Column.Group>
                                            <Column size={12}>
                                                <Title size={6} className="has-text-grey has-text-centered">
                                                    Your notes on the cloud
                                                </Title>
                                            </Column>
                                        </Column.Group>
                                        <LoginForm />
                                    </Section>
                                </Card.Content>
                            </Card>
                        </Column>
                    </Column.Group>
                </Container>
            </Section>
        </div>
    );
}

export default LoginScreen