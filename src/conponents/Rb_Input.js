import React from 'react'
import { useWindowDimensions } from 'react-native';
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

const Rb_Input = (props) => {
    const { label, value, onChangeText, secureTextEntry, returnKeyType } = props
    const { width } = useWindowDimensions()
    return (
        <Container width={width - 20}>
            <Input
                value={value}
                placeholder={label}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                returnKeyType={returnKeyType}
            />
        </Container>
    )
}

Rb_Input.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    secureTextEntry: PropTypes.bool,
}

export default Rb_Input