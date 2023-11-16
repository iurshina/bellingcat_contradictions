import React, {FormEvent, useContext, useRef, useState} from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import styled from 'styled-components';

import processCollection from '../hooks/processCollection';
import Select from "react-select";
import {AppDataContext} from "../AppDataContext";

const CollectionWindow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 420px;
  height: 420px;
  box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
  padding-top: 30px;
  padding-bottom: 20px;
  border-radius: 8px;
  background-color: black;
  align-items: center;
  justify-content: center;
  place-items: center;
  position: relative;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 30px;
`

const InputContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    background: #fff;
    padding: 15px 20px;
    border-radius: 100px;
    width: clamp(210px, 18vw, 20%);
    justify-content: center;
    margin-bottom: 30px;
`;

const SelectContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    background: #fff;
    padding: 15px 20px;
    border-radius: 100px;
    width: clamp(210px, 18vw, 20%);
    justify-content: center;
    margin-bottom: 30px;
`;

const StyledInput = styled.input`
    width: 100%;
    border: none;
    background: transparent;
    color: #424242;

    &::placeholder {
        color: #7b7b7b;
        font-size: 1em;
    }

    @media (max-width: 820px) {
        font-size: 0.7em;
    }
`;

const ButtonContainer = styled.div<{
    $flex: string,
    $padding: string,
    $size: string
    $borderRadius: string
    $active: boolean
}>`
  display: flex;
  flex: ${props => props.$flex ? props.$flex : '1'};
  align-items: flex-end;
  justify-content: center;

  @media (max-width: 820px) {
    display: flex;
  }

  & button {
    display: flex;
    padding: 10px 20px;
    border: none;
    border-radius: 100px;
    background: var(--beige-active-color);
    transition: .3s ease-in-out opacity, box-shadow;
    cursor: pointer;
    width: 210px;
    justify-content: center;

    &:hover {
        opacity: 0.85;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
    }

}
`;

export const ProcessForm: React.FC = () => {
    const [modelRef, setModelRef] = useState("")
    const topicRef = useRef<HTMLInputElement>(null);
    const [collectionNameRef, setCollectionNameRef] = useState("")
    const { process } = processCollection();
    const { models, collections } = useContext(AppDataContext);

    const modelSelect = models.map(d => ({
        "value" : d,
        "label" : d
    }))

    const collectionSelect = collections.map(d => ({
        "value" : d,
        "label" : d
    }))

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(modelRef)

        if (modelRef &&
            topicRef.current && topicRef.current.value &&
            collectionNameRef) {
            try {
                const response = await process(modelRef, topicRef.current.value, collectionNameRef);
            } catch (error) {
                console.error(error);
            }
            setModelRef('');
            topicRef.current.value = '';
            setCollectionNameRef('');
            //reloadCollectionNames();
        }
    }

    return (
        <CollectionWindow>
            <Title>Process the data</Title>
            <form onSubmit={e => onSubmit(e)}>

                <SelectContainer>
                    <Select options={ modelSelect } defaultValue={{ label: "Choose model", value: "" }} onChange={(e) => setModelRef(e.value)}/>
                </SelectContainer>
                <InputContainer>
                    <StyledInput type="text" placeholder="Type your topic" ref={ topicRef } />
                </InputContainer>
                <SelectContainer>
                    <Select options={ collectionSelect } defaultValue={{ label: "Choose collection", value: "" }} onChange={(e) => setCollectionNameRef(e.value)}/>
                </SelectContainer>
                <ButtonContainer $flex="0" $padding="0" $active={true} $size="3.2em" $borderRadius="50%">
                    <button>
                        <AiOutlineArrowRight color='#fff' size="1.5em" />
                    </button>
                </ButtonContainer>
            </form>
        </CollectionWindow>
    )
}