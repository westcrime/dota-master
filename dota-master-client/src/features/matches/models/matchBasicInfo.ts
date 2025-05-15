export default interface Hero {
  id: number;
  name: string;
  displayName: string;
}

export default interface MatchBasicInfo {
  matchId: string;
  isWin: boolean;
  duration: string;
  startTime: Date;
  hero: Hero;
  kills: number;
  averageRank: number;
  deaths: number;
  assists: number;
}
