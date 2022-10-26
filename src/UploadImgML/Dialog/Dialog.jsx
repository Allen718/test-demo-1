import React from "react";
// import SvgIconML from '@/components/SvgIconML/SvgIconML';
import DialogStyled from "./DialogStyled";

const Dialog = (props) => {
  const { visible } = props;
  //点击关闭按钮
  const handleCloseClick = (e) => {
    props.onClose(e);
  };
  //点击蒙层
  const handleMaskClick = () => {
    // props.onClose();
  };
  return (
    <DialogStyled visible={visible}>
      <div className="dialog_mask" onClick={handleMaskClick}></div>
      <div className="dialog_content">
        <span className="dialog_close" onClick={handleCloseClick}>
          <svg>
            <use xlinkHref="#react"></use>
          </svg>
        </span>
        {props.children}
      </div>
    </DialogStyled>
  );
};
export default Dialog;
