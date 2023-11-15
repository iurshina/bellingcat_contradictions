import React, { FormEvent, useRef } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import styled from 'styled-components';

import sendCollectionData from '../hooks/sendCollectionData';

const WrapperContainer = styled.div`
  display: grid;
  height: 100vh;
  place-items: center;
`;

const CollectionWindow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 520px;
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

export const FolderInputForm: React.FC = () => {
    const collectionDirRef = useRef<HTMLInputElement>(null);
    const collectionNameRef = useRef<HTMLInputElement>(null);
    const { send } = sendCollectionData();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (collectionDirRef.current && collectionDirRef.current.value && collectionNameRef.current && collectionNameRef.current.value) {
            try {
                await send(collectionDirRef.current.value, collectionNameRef.current.value);

            } catch (error) {
                console.error(error);
            }
            collectionDirRef.current.value = '';
            collectionNameRef.current.value = '';
        }
    }

    return (
        <div className={"modal"}>
            <WrapperContainer>
                <CollectionWindow>
                    <Title>Load the data</Title>
                    <form onSubmit={e => onSubmit(e)}>
                        <InputContainer>
                            <StyledInput type="text" placeholder="Enter directory" ref={ collectionDirRef } />
                        </InputContainer>
                        <InputContainer>
                            <StyledInput type="text" placeholder="Name your collection" ref={ collectionNameRef } />
                        </InputContainer>
                        <ButtonContainer $flex="0" $padding="0" $active={true} $size="3.2em" $borderRadius="50%">
                            <button>
                                <AiOutlineArrowRight color='#fff' size="1.5em" />
                            </button>
                        </ButtonContainer>
                    </form>
                </CollectionWindow>
            </WrapperContainer>
        </div>
    )
}