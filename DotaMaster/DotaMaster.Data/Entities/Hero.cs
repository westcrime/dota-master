namespace DotaMaster.Data.Entities
{
    public class Hero
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string LocalizedName { get; set; }
    }
}
