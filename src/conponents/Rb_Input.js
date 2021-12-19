import React, { forwardRef } from 'react'
import { useWindowDimensions, TextInput } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.View`
    width:${({ width }) => width}px;
    padding:10px;
    margin-bottom:10px;
    background:#DDDDDD;
    border:1px;
    border-radius:15px;
`;
const Input = styled.TextInput`
    padding-left:7px;
`

const Rb_Input = forwardRef((props, ref) => {
    const { label, value, onChangeText, secureTextEntry, returnKeyType, onSubmitEditing } = props
    const { width } = useWindowDimensions()
    return (
        <Container width={width - 20}>
            <Input
                ref={ref}
                value={value}
                placeholder={label}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
            />
        </Container>
    )
}
)

Rb_Input.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    secureTextEntry: PropTypes.bool,
}

export default Rb_Input