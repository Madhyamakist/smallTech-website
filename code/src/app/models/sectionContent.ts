import { type ReactElement } from "react";

export interface SectionContent {
  id: string;
  title: string;
  mainHeader?: boolean;
  content: ReactElement;
}


