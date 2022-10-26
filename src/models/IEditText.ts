import { onSaveProps } from 'react-edit-text';

export interface IEditTextComponent {
  isTextArea?: boolean;
  title?: string;
  defaultValue: string;
  value?: string;
  setValue?: React.Dispatch<React.SetStateAction<string | undefined>>;
  onBlur?: () => Promise<void>;
  hovered: boolean;
  isUser: boolean;
  onSave?: (({ name, value, previousValue }: onSaveProps) => void) | undefined;
  name?: string;
}
