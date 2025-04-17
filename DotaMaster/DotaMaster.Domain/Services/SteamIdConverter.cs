using System.Numerics;

namespace DotaMaster.Domain.Services
{
    public static class SteamIdConverter
    {
        private const string SteamConstant = "76561197960265728";

        public static long SteamIdToDotaId(string steamId)
        {
            var steamIdParts = steamId.Split(':');
            if (steamIdParts.Length != 3)
            {
                throw new ArgumentException("Invalid SteamID format.");
            }

            int y = int.Parse(steamIdParts[1]);
            int z = int.Parse(steamIdParts[2]);

            int steamAccount = z * 2 + y;
            return (long)steamAccount;
        }

        /// <summary>
        /// Конвертирует SteamID в CommunityID.
        /// </summary>
        /// <param name="steamId">SteamID</param>
        /// <returns>CommunityID</returns>
        public static string GetCommunityFromID(string steamId)
        {
            var parts = steamId.Split(':');
            if (parts.Length != 3)
            {
                throw new ArgumentException("Invalid SteamID format.");
            }

            int idNum = int.Parse(parts[1]);
            BigInteger accountNum = BigInteger.Parse(parts[2]);
            BigInteger constant = BigInteger.Parse(SteamConstant);

            BigInteger communityId = (accountNum * 2) + idNum + constant;
            return communityId.ToString();
        }

        /// <summary>
        /// Конвертирует CommunityID в SteamID.
        /// </summary>
        /// <param name="communityId">CommunityID</param>
        /// <returns>SteamID</returns>
        public static string GetIDFromCommunity(string communityId)
        {
            BigInteger id = BigInteger.Parse(communityId);
            BigInteger constant = BigInteger.Parse(SteamConstant);

            BigInteger idNum = id % 2;
            BigInteger temp = id - constant;
            if (idNum == 1)
            {
                temp -= 1;
            }

            BigInteger accountNum = temp / 2;
            return $"STEAM_0:{idNum}:{accountNum}";
        }
    }
}
