import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import {Link,useHistory} from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { useToast } from '../../context/toast';

import getValidationsErros from '../../utils/getValidationsErros';
import Logo from '../../assets/logo.svg';

import Input from '../../componets/Input';
import Button from '../../componets/Button';

import { Content, Container, AnimationContainer, BackGround } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history  = useHistory();
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email Obrigatório')
            .email('Digite um email válido!'),
          password: Yup.string().required('Senha Obrigatória!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });
        history.push("/dashboard");
      } catch (err) {

        if(err instanceof Yup.ValidationError){
          const errors = getValidationsErros(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type:'error',
          title:'Erro na Autenticação!',
          description:'Ocorreu um erro ao fazer login, cheque as credenciais!'
        });
      }



    },
    [signIn,addToast],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
        <img src={Logo} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Logon</h1>
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>
      <Link to="/signup">
          <FiLogIn />
          Criar conta
        </Link>
        </AnimationContainer>
        </Content>
      <BackGround />
    </Container>
  );
};

export default SignIn;
