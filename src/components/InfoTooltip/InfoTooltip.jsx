import classnames from "classnames";

import imageSucess from "../../images/success.svg";
import imageFailed from "../../images/failed.svg";

import "./InfoTooltip.css";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  const classNameInfoToolTip = classnames("info-tooltip", {
    "info-tooltip_opened": isOpen,
  });
  return (
    <div className={classNameInfoToolTip}>
      <div className="info-tooltip__container">
        <button
          className="info-tooltip__button-close"
          type="button"
          onClick={onClose}
        />
        <img
          className="info-tooltip__image-info"
          src={isSuccess ? imageSucess : imageFailed}
          alt={isSuccess ? "черная галочка в круге" : "красный крестик в круге"}
        />
        <h2 className="info-tooltip__title">{message}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
