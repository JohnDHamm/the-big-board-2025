type ScoringType = 'ppr' | 'non-ppr';

interface Position_Slot {
  position: NFL_Position;
  total: number;
}

type DraftStatus = 'not started' | 'open' | 'paused' | 'done';

type LeagueListItem = Pick<League, '_id' | 'orgId' | 'name'>;

interface League {
  _id: string;
  orgId: string;
  name: string;
  scoringType: ScoringType;
  positionSlots: Position_Slot[];
  draftOrder: string[];
  draftStatus: DraftStatus;
}
