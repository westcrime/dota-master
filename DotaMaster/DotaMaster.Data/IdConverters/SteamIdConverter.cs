using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.IdConverters
{
    public static class SteamIdConverter
    {
        private const string SteamConstant = "76561197960265728";

        public static long SteamIdToDotaId(string steamId)
        {
            // Разделяем SteamID на части
            var steamIdParts = steamId.Split(':');
            if (steamIdParts.Length != 3)
            {
                throw new ArgumentException("Invalid SteamID format.");
            }

            // Извлекаем Y и Z
            int y = int.Parse(steamIdParts[1]);
            int z = int.Parse(steamIdParts[2]);

            // Рассчитываем steamacct
            int steamAccount = z * 2 + y;

            // Формируем [U:1:{steamacct}]
            //return $"[U:1:{steamAccount}]";
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
