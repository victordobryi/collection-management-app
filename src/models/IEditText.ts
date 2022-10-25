export interface IEditTextComponent {
  isTextArea?: boolean;
  title?: string;
  defaultValue: string;
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  onBlur: () => Promise<void>;
  hovered: boolean;
  isUser: boolean;
}
