# См. статью по ссылке https://aka.ms/customizecontainer, чтобы узнать как настроить контейнер отладки и как Visual Studio использует этот Dockerfile для создания образов для ускорения отладки.

# Этот этап используется при запуске из VS в быстром режиме (по умолчанию для конфигурации отладки)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080


# Этот этап используется для сборки проекта службы
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["DotaMaster.API/DotaMaster.API.csproj", "DotaMaster.API/"]
COPY ["DotaMaster.Application/DotaMaster.Application.csproj", "DotaMaster.Application/"]
COPY ["DotaMaster.Data/DotaMaster.Data.csproj", "DotaMaster.Data/"]
COPY ["DotaMaster.Domain/DotaMaster.Domain.csproj", "DotaMaster.Domain/"]
RUN dotnet restore "./DotaMaster.API/DotaMaster.API.csproj"
COPY . .
WORKDIR "/src/DotaMaster.API"
RUN dotnet build "./DotaMaster.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Этот этап используется для публикации проекта службы, который будет скопирован на последний этап
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./DotaMaster.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Этот этап используется в рабочей среде или при запуске из VS в обычном режиме (по умолчанию, когда конфигурация отладки не используется)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DotaMaster.API.dll"]