import styled from "styled-components";

const UploadImgStyled = styled.div`
  overflow-x: auto;
  min-height: 150px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  .input {
    width: 150px;
    height: 150px;
    /* flex: 1; */
    border-radius: 4px;
    position: relative;
    border: 1px solid #cccccc;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(245, 245, 245);
    .addPictureIcon {
      width: 38px;
      height: 38px;
      fill: rgba(0, 0, 0, 0.87);
    }
    input {
      cursor: pointer;
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      height: 100%;
      width: 100%;
      opacity: 0;
    }
  }
  img {
    max-width: 148px;
    margin: auto;
    max-height: 148px;
    border-radius: 4px;
  }
  .card-wrapper {
    display: flex;
    flex-direction: column;
  }
  .card {
    height: 150px;
    width: 150px;
    position: relative;
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .buttonWrapper {
    background: #000000;
    border-radius: 4px;
    opacity: 0.7;
    width: 100%;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    display: none;
    align-items: center;
    justify-content: center;
  }
  .imgItem {
    width: 150px;
    height: 150px;
    border-radius: 4px;
    position: relative;
    border: 1px solid #cccccc;
    background-color: rgb(245, 245, 245);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .close {
      cursor: pointer;
      position: absolute;
      top: 0px;
      right: 0px;
      width: 24px;
      height: 24px;
    }
    .img {
      width: 120px;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        max-width: 100px;
        max-height: 120px;
      }
    }
  }
`;
export default UploadImgStyled;
