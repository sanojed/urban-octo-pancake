FROM mcr.microsoft.com/dotnet/sdk:5.0 as build-env
WORKDIR /micro
COPY ./micro/micro.csproj .
RUN dotnet restore
COPY ./micro .
RUN dotnet publish -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:5.0 as runtime
WORKDIR /publish
COPY --from=build-env /publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "micro.dll"]