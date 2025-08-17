type ScoringType = 'ppr' | 'non-ppr';

type NFL_Position = 'QB' | 'RB' | 'WR' | 'TE' | 'D' | 'K';

interface Position_Slot {
  position: NFL_Position;
  total: number;
}

type DraftStatus = 'not started' | 'open' | 'paused' | 'done';
