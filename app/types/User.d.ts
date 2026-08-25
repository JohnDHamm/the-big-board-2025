interface Owner {
  _id: string;
  userId: string;
  name: string;
  leagueId: string;
}

interface AvatarUrl {
  imageUrl: string;
}

type OwnerSelectOption = AvatarUrl & Omit<Owner, 'userId' | 'leagueId'>;

interface Commish {
  isCommish: boolean;
}

type User = Owner & Commish | null;
