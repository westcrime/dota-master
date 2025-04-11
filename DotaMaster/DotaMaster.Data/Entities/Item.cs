namespace DotaMaster.Data.Entities
{
    public class Item
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Lore { get; set; }
        public int Cost { get; set; }
        public required string IconUrl { get; set; }
        public required string Description { get; set; }
    }
}
