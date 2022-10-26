export interface IModalProps {
  handleClose: () => void;
  userId: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IModalCollectionProps extends IModalProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IModalItemProps extends IModalProps {
  collectionId: string;
  additionalInputs: string;
}

export interface IConfirmModal {
  show: boolean;
  onHide: () => void;
  deleteFunc: () => void;
}
