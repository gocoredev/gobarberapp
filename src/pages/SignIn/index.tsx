/* eslint-disable prettier/prettier */
import React, {useCallback, useRef} from 'react';
import { View, Image, Text, KeyboardAvoidingView,ScrollView , Platform, TextInput, Alert } from 'react-native';

import Button from '../../components/Button'
import Input from '../../components/Input'
import Icon from 'react-native-vector-icons/Feather'
import * as S from './styles';
import logoImg from '../../assets/logo.png'
import { useNavigation } from '@react-navigation/native';

import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup'
import getValidationErros from '../../utils/getVallidationErrors'

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null)
  const navigation = useNavigation();
  
  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {

        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
            email: Yup.string().email('Digite um e-mail valido').required('Email é obrigatório'),
            password: Yup.string().required('Senha Obrigatória')
        })

        await schema.validate(data, {
            abortEarly: false
        })

        /* signIn({
            email: data.email,
            password: data.password
        }) */
        
        // history.push('/dashboard')
    } catch(e) {
        
      if (e instanceof Yup.ValidationError) {
        
        const errors = getValidationErros(e)
        
        formRef.current?.setErrors(errors)
        
        return;
      }
      console.log(e)
      Alert.alert('Erro na Autenticação', 'Ocorreu um erro ao fazer login')
    }
}, [])

  return (
      <React.Fragment>
        <KeyboardAvoidingView 
        style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
        >

          <ScrollView
          contentContainerStyle={{flex: 1 ,flexDirection: 'column', justifyContent: 'center'}}
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

                  <Input 
                    autoCapitalize="none" 
                    autoCorrect={false} 
                    keyboardType="email-address" 
                    name="email" 
                    icon="mail" 
                    placeholder="E-mail" 
                    returnKeyType="next" 
                    onSubmitEditing={()=>{
                      passwordInputRef.current?.focus()
                  }}/>

                  <Input 
                    ref={passwordInputRef}
                    secureTextEntry  
                    name="password" 
                    returnKeyType="send" 
                    onSubmitEditing={()=>{
                    formRef.current?.submitForm()
                    }} icon="lock" placeholder="Senha"
                  />

                  <Button 
                    onPress={()=>{
                    formRef.current?.submitForm()
                    }}>
                    Entrar
                  </Button>

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