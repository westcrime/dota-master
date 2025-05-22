namespace DotaMaster.Data.Entities
{
    public class Item
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string DisplayName { get; set; }
        public required string Lore { get; set; }
        public int? Cost { get; set; }
        public List<Attribute>? Attributes { get; set; }
        public required string IconUrl { get; set; }
        public required string Description { get; set; }
    }
    public class Attribute
    {
        public required string Name { get; set; }
        public required string Value { get; set; }
    }
}
