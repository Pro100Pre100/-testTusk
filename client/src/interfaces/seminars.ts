export type seminarsState = Record<
  'id' |
  'title' |
  'description' |
  'date' |
  'photo' |
  'time', string>;


export interface seminarCardProps {
  img: string;
  title: string;
  description: string;
  handleDelete: () => void;
  handleEdit: () => void;
}

export interface deleteModalProps {
  open: boolean;
  enableUpdateSeminars: () => void;
  handleClose: () => void;
}

export interface editModalProps extends deleteModalProps {
  seminars: seminarsState[];
}

export interface seminarInfoState {
  title: string | null;
  description: string | null;
}