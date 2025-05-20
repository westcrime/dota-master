namespace DotaMaster.Application.Models
{
    public record ItemModel(
        int Id,
        string Name,
        string DisplayName,
        string Lore,
        int? Cost,
        string IconUrl,
        string Description,
        List<Attribute>? Attributes);

    public record Attribute(string Name, string Value);
}
