/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Image, Text, KeyboardAvoidingView,ScrollView , Platform } from 'react-native';

import Button from '../../components/Button'
import Input from '../../components/Input'
import Icon from 'react-native-vector-icons/Feather'
import * as S from './styles';
import logoImg from '../../assets/logo.png'
import { useNavigation } from '@react-navigation/native';

const SignUp: React.FC = () => {
  const navigation = useNavigation()
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
                <Input name="name" icon="user" placeholder="Nome"/>
                <Input name="email" icon="mail" placeholder="E-mail"/>
                
                <Input  name="password" icon="lock" placeholder="Senha"/>
                <Button onPress={()=>{}}>Entrar</Button>

                
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