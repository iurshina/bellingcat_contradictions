import styled from 'styled-components';

import '../App.css'
import { FolderInputForm } from './DataSelector';
import { ProcessForm } from './DataProcessor';

const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  place-items: center;
  margin: 50px;
  gap: 50px;
`;

export const Window: React.FC = () => {

    return (
        <>
            <WrapperContainer>
                <FolderInputForm></FolderInputForm>
                <ProcessForm></ProcessForm>
            </WrapperContainer>
        </>
    )
}
