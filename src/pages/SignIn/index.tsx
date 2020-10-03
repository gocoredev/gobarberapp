/* eslint-disable prettier/prettier */
import React, {useCallback, useRef} from 'react';
import { View, Image, Text, KeyboardAvoidingView,ScrollView , Platform } from 'react-native';

import Button from '../../components/Button'
import Input from '../../components/Input'
import Icon from 'react-native-vector-icons/Feather'
import * as S from './styles';
import logoImg from '../../assets/logo.png'
import { useNavigation } from '@react-navigation/native';

import {Form} from '@unform/mobile'
import {FormHelpers} from '@unform/core'

const SignIn: React.FC = () => {
  const formRef = useRef<FormHelpers>(null)
  const navigation = useNavigation()
  
  const handleSignIn = useCallback((data: Object) => {
    console.log(data)
  }, [])

  return (
      <React.Fragment>
        <KeyboardAvoidingView 
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
        >

          <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardShouldPersistTaps="handled"
          >
              <S.CreateAccountButton onPress={()=>navigation.navigate('SignUp')}>
                <S.CreateAccountText>
                  Criar uma conta <Icon name="log-in" size={20} color="#ff9000" />
                </S.CreateAccountText>
              </S.CreateAccountButton>
              <S.Container>
                <Image source={logoImg}  />
                <View><S.Title>Faça seu logon</S.Title></View>

                <Form ref={formRef} onSubmit={handleSignIn}>

                  <Input name="email" icon="mail" placeholder="E-mail"/>
                  <Input  name="password" icon="lock" placeholder="Senha"/>

                  <Button onPress={()=>{}}>Entrar</Button>

                </Form>

                <S.ForgotPassword onPress={()=>{
                  formRef.current?.submitForm()
                }}>
                  <S.ForgotPasswordText>Esqueci minha senha!</S.ForgotPasswordText>
                </S.ForgotPassword>
              </S.Container>
          </ScrollView>
          
        </KeyboardAvoidingView>
      </React.Fragment>
  );
}

export default SignIn;