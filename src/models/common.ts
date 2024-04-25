export interface Server {
  name: string;
  description: string;
  server_ip: string;
  nat_space_id: string;
  server_nat_ip: string;
  status: ServerStatus
}

export enum ServerStatus {
  ONLINE = 'online',
  PENDING = 'pending',
  ERROR = 'error',
};

export interface ServerApiResponse {
  data?: Server[];
}

export interface NATSpacesApiResponse {
  data?: NATSpace[];
}

export interface NATSpace {
  id: string;
  name: string;
}

export type ServerWithState = Server & {
  id: number | null;
  selected?: boolean;
  expanded?: boolean;
}

export enum ItemAction {
  CREATE = 'Create',
  EDIT = 'Edit',
  REMOVE = 'Remove'
}
