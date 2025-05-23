﻿namespace DotaMaster.Data.Entities.Profile
{
    public class MatchBasicInfo
    {
        public required string MatchId { get; set; }
        public bool IsWin { get; set; }
        public TimeSpan Duration { get; set; }
        public DateTime StartTime { get; set; }
        public required Hero Hero { get; set; }
        public int Skill { get; set; }
        public int Kills { get; set; }
        public int AverageRank { get; set; }
        public int Deaths { get; set; }
        public int Assists { get; set; }
    }
}
