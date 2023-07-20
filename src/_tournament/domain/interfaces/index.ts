import { LeagueType } from "../../../_shared/domain/LeagueType";

export interface League {
  id: string;
  name: string;
  type: LeagueType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
export interface Tournament {
  id: string;
  type: LeagueType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

