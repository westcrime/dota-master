namespace DotaMaster.Data.ResponseModels.Items
{
    public class ItemResponse
    {
        public int Id { get; set; }
        public string? Dname { get; set; }

        public string? Lore { get; set; }
        public int Cost { get; set; }
        public string? Img { get; set; }
        public Abilities[]? Abilities { get; set; }
    }

    public class Abilities
    {
        public string? Description { get; set; }
    }
}
