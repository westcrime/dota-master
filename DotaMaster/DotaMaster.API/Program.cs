using DotaMaster.API.DI;
using DotaMaster.Application.DI;
using DotaMaster.Data.DI;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

builder.Services.AddApiDI();
builder.Services.AddDataDI(configuration);
builder.Services.AddApplicationDI();
builder.Services.AddAuthDI();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(configuration["FrontendUrl"] ?? throw new ArgumentNullException("FrontendUrl is null"))
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();

        policy.WithOrigins(configuration["FrontendDockerUrl"] ?? throw new ArgumentNullException("FrontendBackendUrl is null"))
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddAuthorization();
builder.Services.AddHttpClient();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();