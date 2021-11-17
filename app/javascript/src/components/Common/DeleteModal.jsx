import React from "react";

import { Modal, Typography, Button } from "@bigbinary/neetoui/v2";

const DeleteModal = ({
  id,
  showDeleteModal,
  setShowDeleteModal,
  destroyItem,
  item,
}) => {
  return (
    <div>
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>
          <Typography style="h2">Delete {item}</Typography>
        </Modal.Header>
        <Modal.Body>
          <Typography style="body2" lineHeight="normal">
            Do you want to delete the {item}?
          </Typography>
        </Modal.Body>
        <Modal.Footer className="space-x-2">
          <Button
            label="Continue"
            onClick={() => destroyItem(id)}
            size="large"
          />
          <Button
            style="text"
            label="Cancel"
            onClick={() => setShowDeleteModal(false)}
            size="large"
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteModal;
