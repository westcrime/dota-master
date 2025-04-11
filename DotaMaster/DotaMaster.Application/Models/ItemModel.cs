namespace DotaMaster.Application.Models
{
    public record ItemModel(
        int Id,
        string Title,
        string Lore,
        int Cost,
        string IconUrl,
        string Description);
}
