namespace DotaMaster.API.DTOs
{
    public record ItemDto(
        int Id,
        string Title,
        int Cost,
        string IconUrl,
        string Description);
}
