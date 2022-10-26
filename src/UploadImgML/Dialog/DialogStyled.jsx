import styled from 'styled-components';
const DialogStyled = styled.div`
  display: ${(props) => (props.visible ? 'block' : 'none')};
  .dialog_mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(127, 127, 127, 0.5);
    z-index: 1;
  }
  .dialog_content {
    position: fixed;
    background: white;
    min-width: 20em;
    z-index: 2;
    border-radius: 4px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .dialog_close {
    position: absolute;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -30px;
    right: -30px;
  }
`;
export default DialogStyled;
