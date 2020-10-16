/* eslint-disable prettier/prettier */
import React, { useRef, useCallback, useState } from 'react';
import { View, Image, Text, KeyboardAvoidingView,ScrollView , Platform, TextInput, Alert} from 'react-native';

import Button from '../../components/Button'
import Input from '../../components/Input'
import Icon from 'react-native-vector-icons/Feather'
import * as S from './styles';
import logoImg from '../../assets/logo.png'
import { useNavigation } from '@react-navigation/native';
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'
import api from '../../services/api'
import * as Yup from 'yup'

import getVallidationErrors from '../../utils/getVallidationErrors'

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const navigation = useNavigation()

  const emailInputRef = useRef<TextInput>(null)

  const passwordInputRef = useRef<TextInput>(null)
  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      console.log(data)
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome é Obrigatório'),
            email: Yup.string().email('Digite um e-mail valido').required('Email é obrigatório'),
            password: Yup.string().min(6, 'no mínimo 6 digitos')
        })

        await schema.validate(data, {
            abortEarly: false
        })

        await api.post('/users', data)
        
        Alert.alert('Cadastro realizado')

        navigation.goBack()
        
    } catch(e) {

        if (e instanceof Yup.ValidationError) {
          
          const errors = getVallidationErrors(e)
          
          formRef.current?.setErrors(errors)
          
          Alert.alert('Erro no cadastro', 'Ocorreu um erro ao fazer o cadastro, tente novamente')
          
          return;
        }
        

        console.log(e)
    }
}, [navigation])
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
              
              <S.Container>
                
                <Image source={logoImg}  />
                <View><S.Title>Criar sua conta</S.Title></View>


                <Form ref={formRef} onSubmit={handleSignUp}>
                    <Input 
                      autoCapitalize="words" 
                      name="name" 
                      icon="user" 
                      placeholder="Nome"
                      returnKeyType="next"
                      onSubmitEditing={()=>{
                        emailInputRef.current?.focus()
                      }}
                    />
                    
                    <Input
                      ref={emailInputRef}
                      keyboardType="email-address" 
                      autoCorrect={false} 
                      autoCapitalize="none" 
                      name="email" 
                      icon="mail" 
                      placeholder="E-mail"
                      returnKeyType="next"
                      onSubmitEditing={()=>{
                        passwordInputRef.current?.focus()
                      }}
                    />
                    
                    <Input 
                      ref={passwordInputRef}
                      secureTextEntry 
                      name="password" 
                      icon="lock" 
                      placeholder="Senha"
                      returnKeyType="send"
                      textContentType="newPassword"
                      onSubmitEditing={()=>formRef.current?.submitForm()}
                    />
                    <Button onPress={()=>formRef.current?.submitForm()}>Entrar</Button>
                </Form>

                
              </S.Container>
              
          </ScrollView>
          
        </KeyboardAvoidingView>
        <S.BackToSignInButton onPress={()=>navigation.goBack()}>
                <S.BackToSignInText>
                  <Icon name="arrow-left" size={20} color="#ff9000" />
                  Voltar para Logon
                </S.BackToSignInText>
              </S.BackToSignInButton>
      </React.Fragment>
  );
}

export default SignUp;