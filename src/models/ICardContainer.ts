export interface ICardContainer {
  onClick?: () => void;
  isOnPage: boolean;
  isUser: boolean;
  sectionName: string;
  containerName: string;
  children: React.ReactElement;
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  title?: string;
  img?: string;
  isRound?: boolean;
  deleteElem: () => Promise<void>;
  setHovered: React.Dispatch<React.SetStateAction<boolean>>;
  hovered: boolean;
  isAvatar?: boolean;
}
