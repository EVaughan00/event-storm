ARG BUILD

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 as base
WORKDIR /app

FROM $BUILD as build
WORKDIR /src

COPY . .
WORKDIR /src/Services/Server/Server.API
RUN dotnet publish --no-restore -c Release -o /app

FROM build as unit-tests
WORKDIR /src/Services/Server/Server.Tests/Server.UnitTests

FROM build as publish
FROM base as final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Server.API.dll"]