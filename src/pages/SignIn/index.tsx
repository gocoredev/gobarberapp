import React from 'react';
import { View, Image, Text } from 'react-native';

import Button from '../../components/Button'
import Input from '../../components/Input'

import * as S from './styles';
import logoImg from '../../assets/logo.png'

const SignIn: React.FC = () => {
  return (
      <S.Container>
          <Image source={logoImg}  />
          <S.Title>Faça seu logon</S.Title>

          <Input name="email" icon="mail" placeholder="E-mail"/>
          <Input  name="password" icon="lock" placeholder="Senha"/>
          <Button onPress={()=>{}}>Entrar</Button>
      </S.Container>
  );
}

export default SignIn;