export const MOCK_USER: User = {
  _id: "612efd69ebec27001777f328",
  name: "owner one",
  leagueId: "5f3d99a25d018c175707cb4e",
  isCommish: true,
  accessToken: "mockaccesstoken",
}

export const mockPlayer1: PlayerInfo = {
  _id: "wlkvhfslkgjs;lb",
  firstName: "Keon",
  lastName: "Coleman",
  teamId: "slkvnsflkvnfskv",
  position: "WR",
  available: true,
  positionRank: 45,
  overallRank: 180
}

export const mockUnavailablePlayer1: PlayerInfo = {
  _id: "wlkvhfslkgjs;lb",
  firstName: "Keon",
  lastName: "Coleman",
  teamId: "slkvnsflkvnfskv",
  position: "WR",
  available: false,
  positionRank: 45,
  overallRank: 180
}

export const mockPlayer2: PlayerInfo = {
  _id: "wlkvhfslkgjs;lb",
  firstName: "Emari",
  lastName: "Demarcado",
  teamId: "slkvnsflkvnfskv",
  position: "RB",
  available: true,
  positionRank: 81,
  overallRank: 289
}

export const mockTeamBUF: Team = {
  _id: "wfgagadfghbdag",
  city: "Buffalo",
  nickname: "Bills",
  abbv: "BUF",
  colors: {
    primary: "#00338D",
    secondary: "#C60C30",
  },
  byeWeek: 7
}

export const mockTeamARI: Team = {
  _id: "wfgagadfghbdag",
  city: "Arizona",
  nickname: "Cardinals",
  abbv: "ARI",
  colors: {
    primary: "#97233F",
    secondary: "#000000",
  },
  byeWeek: 8
}