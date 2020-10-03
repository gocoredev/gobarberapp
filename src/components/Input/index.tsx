import React, {useEffect, useRef} from 'react';
import { View, TextInputProps } from 'react-native';

import {useField} from '@unform/core'

import * as S from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;

}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({name, icon, ...rest}) => {
  const {registerField, defaultValue = '', fieldName, error} = useField(name)
  const inputValueRef = useRef<InputValueReference>({value: defaultValue})

  useEffect(()=>{
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  return (
  <S.Container>
      <S.Icon name={icon} size={20} color="#666360"/>
      <S.TextInput 
        keyboardAppearance="dark"
        placeholderTextColor="#666360" 
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
  </S.Container>);
}

export default Input;