using Factura.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Factura.Services;

public class FacturaServices
{
    private readonly IMongoCollection<DatosFactura> facturaCollections;

    public FacturaServices(
        IOptions<ConectBD> facturaStoreDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            facturaStoreDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            facturaStoreDatabaseSettings.Value.DatabaseName);

        facturaCollections = mongoDatabase.GetCollection<DatosFactura>(
            facturaStoreDatabaseSettings.Value.CollectionName);
    }

    public async Task<List<DatosFactura>> GetAsync() =>
        await facturaCollections.Find(_ => true).ToListAsync();

    public async Task<DatosFactura?> GetAsync(string codigoFactura) =>
        await facturaCollections.Find(x => x.CodigoFactura == codigoFactura).FirstOrDefaultAsync();

    public async Task CreateAsync(DatosFactura newFactura) =>
        await facturaCollections.InsertOneAsync(newFactura);

    public async Task UpdateAsync(string codigoFactura, DatosFactura updatedFactura) =>
        await facturaCollections.ReplaceOneAsync(x => x.CodigoFactura == codigoFactura, updatedFactura);

    public async Task RemoveAsync(string codigoFactura) =>
        await facturaCollections.DeleteOneAsync(x => x.CodigoFactura == codigoFactura);
}