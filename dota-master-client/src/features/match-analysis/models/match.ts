export interface Match {
  matchId: number;
  dotaId: number;
  generalInfo: GeneralInfo;
  userStats: UserStats;
  avgHeroStats: AvgHeroStats;
  laning: Laning;
  picks: Picks;
  winratesAnalysis: string;
  laningAnalysis: string;
  itemsAnalysis: string;
}

export interface GeneralInfo {
  didRadiantWin: boolean;
  rank: number;
  durationSeconds: number;
  radiantNetworthLeads: number[];
  radiantExperienceLeads: number[];
  radiantKills: number[];
  direKills: number[];
  players: PlayerStats[];
}

export interface PlayerStats {
  position: string;
  steamAccountId: string;
  heroId: number;
  isRadiant: boolean;
  networth: number;
  kills: number;
  deaths: number;
  assists: number;
  goldPerMinute: number;
  experiencePerMinute: number;
  numDenies: number;
  numLastHits: number;
  imp: number;
  item0Id?: number | null;
  item1Id?: number | null;
  item2Id?: number | null;
  item3Id?: number | null;
  item4Id?: number | null;
  item5Id?: number | null;
  backpack0Id?: number | null;
  backpack1Id?: number | null;
  backpack2Id?: number | null;
}

export interface UserStats {
  heroId: number;
  isRadiant: boolean;
  networth: number;
  kills: number;
  deaths: number;
  assists: number;
  goldPerMinute: number;
  experiencePerMinute: number;
  numDenies: number;
  numLastHits: number;
  imp: number;
  impactPerMinute: number[];
  itemPurchases: ItemPurchase[];
}

export interface ItemPurchase {
  itemId: number;
  time: number;
}

export interface AvgHeroStats {
  topCore: number;
  topSupport: number;
  kills: number;
  deaths: number;
  assists: number;
  networth: number;
  xp: number;
  cs: number;
  heroDamage: number;
  goldFed: number;
  xpFed: number;
}

export interface Laning {
  position: string;
  rank: string;
  heroId: number;
  dotaId: number;
  laningCs: number;
  avgLaningCs: number;
  laningKills: number;
  avgLaningKills: number;
  laningDeaths: number;
  avgLaningDeaths: number;
  laningNetworth: number;
  avgLaningNetworth: number;
}

export interface Picks {
  heroId: number;
  heroWinrate: number;
  heroWrWithAlliedHeroes: HeroWr[];
  heroWrWithEnemyHeroes: HeroWr[];
}

export interface HeroWr {
  winrate: number;
  heroId: number;
}
