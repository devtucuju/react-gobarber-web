import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {Link,useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import api from '../../services/api';
import {useToast} from '../../context/toast';
import getValidationsErros from '../../utils/getValidationsErros';

import Logo from '../../assets/logo.svg';

import Input from '../../componets/Input';
import Button from '../../componets/Button';

import { Content, Container, BackGround,AnimationContainer } from './styles';

interface SignUpFormData{
nome:string;
email:string;
password:string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {addToast} = useToast();
  const history  = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatório'),
        email: Yup.string()
          .required('Email Obrigatório')
          .email('Digite um email válido!'),
        password: Yup.string().min(6, 'No minimo 6 digitos!'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      await api.post('/users',data);
      history.push('/');
      addToast({
        type:'success',
        title:'Cadastro realizado!',
        description:"Você já pode fazer seu logon no sistema"
      });

    } catch (err) {
      if(err instanceof Yup.ValidationError){
        const errors = getValidationsErros(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type:'error',
        title:'Erro no cadastro!',
        description:'Ocorreu um erro ao fazer cadastro, tente novamente!'
      });
    }
  }, [addToast,history]);
  return (
    <Container>
      <BackGround />
      <Content>
        <AnimationContainer>
        <img src={Logo} alt="GoBarber" />
        {/* <Form initialData={{ name: 'Diego' }} onSubmit={handleSubmit}> */}
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>
          <Input name="name" icon={FiUser} type="text" placeholder="Name" />
          <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para Logon
        </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
