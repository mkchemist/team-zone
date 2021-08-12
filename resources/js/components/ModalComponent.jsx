import React from "react";
import PropTypes from "prop-types";

function ModalComponent({
  HeaderComponent,
  FooterComponent,
  children,
  id,
  show,
  onClose,
}) {
  React.useEffect(() => {
    if (show) {
      $(`#${id}`).modal("show");
    } else {
      $(`#${id}`).modal("hide");
    }
    $(`#${id}`).on("hide.bs.modal", () => {
      onClose();
    });
  }, [show]);

  return (
    <div className="modal fade" id={id}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {HeaderComponent && (
            <div className="modal-header p-0">
              <HeaderComponent />
            </div>
          )}
          <div className="modal-body">{children && { ...children }}</div>
          {FooterComponent && <div className="modal-footer"></div>}
        </div>
      </div>
    </div>
  );
}

ModalComponent.defaultProps = {};

ModalComponent.propTypes = {
  HeaderComponent: PropTypes.elementType,
  FooterComponent: PropTypes.elementType,
  id: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalComponent;
