namespace DotaMaster.Data.ResponseModels.Items
{
    public class ItemResponse
    {
        public int Id { get; set; }
        public required string Dname { get; set; }

        public required string Lore { get; set; }
        public int Cost { get; set; }
        public required string Img { get; set; }
        public required Abilities[] Abilities { get; set; }
    }

    public class Abilities
    {
        public string? Description { get; set; }
    }
}
