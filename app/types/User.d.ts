interface Owner {
  _id: string;
  name: string;
  leagueId: string;
  isCommish: boolean;
}

interface AccessToken {
  accessToken: string;
}

type User = (Owner & AccessToken) | null;

interface Password {
  password: string;
}

type UserLogin = Pick<Owner, 'name' | 'leagueId'> & Password;
