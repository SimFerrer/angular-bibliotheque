import { PagedResponse } from "../../core/models/response.model";

export interface Editor {
    id: number | null;
    name: string;
  }

  export type EditorResponse = PagedResponse<Editor>;