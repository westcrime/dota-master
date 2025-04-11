namespace DotaMaster.API.DTOs
{
    public record ItemDto(
        int Id,
        string Title,
        string Lore,
        int Cost,
        string IconUrl,
        string Description);
}
