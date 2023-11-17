import React, {FormEvent, useContext, useRef, useState} from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import styled from 'styled-components';

import processCollection from '../hooks/processCollection';
import Select from "react-select";
import { AppDataContext } from "../AppDataContext";

const CollectionWindow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 900px;
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

const FilesWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 20px;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 30px;
`

const SmallTitle = styled.h2`
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

const StyledTextarea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 800px;
    align-items: center;
    background: #fff;
    padding: 15px 20px;
    border-radius: 10px;
    justify-content: center;
    margin-bottom: 30px;
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

export const Description = styled.p<{
    $color: string,
    $size: string
}>`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: ${ props => props.$size };
    
    color: ${ props => props.$color }
`;

export interface DetectionResponse {
    model_type: string;
    topic: string;
    data: Array<Array<[Array<string>, number]>>;
}


export const ProcessForm: React.FC = () => {
    const [modelRef, setModelRef] = useState("")
    const topicRef = useRef<HTMLInputElement>(null);
    const collectionNameRef = useRef<HTMLInputElement>(null);
    const { process } = processCollection();
    const { models } = useContext(AppDataContext);
    const [data, setData] = useState<Array<Array<[Array<string>, number]>>>([]);

    const modelSelect = models.map(d => ({
        "value" : d,
        "label" : d
    }))

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (modelRef &&
            topicRef.current && topicRef.current.value &&
            collectionNameRef && collectionNameRef.current && collectionNameRef.current.value) {
            try {
                const response = await process(modelRef, topicRef.current.value, collectionNameRef.current.value);
                const result: DetectionResponse = await response.data;
                if (result.data && result.data.length > 0) {
                    setData(result.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div>
            <CollectionWindow>
                <Title>Process the data</Title>
                <form onSubmit={e => onSubmit(e)}>

                    <SelectContainer>
                        <Select options={ modelSelect } defaultValue={{ label: "Choose model", value: "" }} onChange={(e) => setModelRef(e.value)}/>
                    </SelectContainer>
                    <InputContainer>
                        <StyledInput type="text" placeholder="Topic of interest" ref={ topicRef } />
                    </InputContainer>
                    <InputContainer>
                        <StyledInput type="text" placeholder="Collection name" ref={ collectionNameRef } />
                    </InputContainer>
                    <ButtonContainer $flex="0" $padding="0" $active={true} $size="3.2em" $borderRadius="50%">
                        <button>
                            <AiOutlineArrowRight color='#fff' size="1.5em" />
                        </button>
                    </ButtonContainer>

                </form>
            </CollectionWindow>
            <FilesWindow>
                {data.map((fileContents, fileIdx) => (
                    <CollectionWindow key={fileIdx}>
                        <SmallTitle>Entry {fileIdx}</SmallTitle>
                        {fileContents.map((sentences, sentencesIdx) => (
                            <StyledTextarea key={sentencesIdx}>
                                {sentences[0].map((sentence, sentenceIdx) => {
                                    if (sentences[1] === sentenceIdx)
                                        return <p key={sentenceIdx}><font color="#FF0000">{sentence}</font></p>
                                    else
                                        return <p key={sentenceIdx}><font color="#000000">{sentence}</font></p>
                                })}
                            </StyledTextarea>
                        ))}
                    </CollectionWindow>
                ))}
            </FilesWindow>
        </div>
    )
}