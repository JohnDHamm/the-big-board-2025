interface Owner {
  _id: string;
  userId: string;
  name: string;
  leagueId: string;
}

interface Commish {
  isCommish: boolean;
}

type User = Owner & Commish | null;
