using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace Factura.Models;
public class DatosFactura
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    // Atributos de la tabla o coleccion
    public string CodigoFactura { get; set; } = null!;
    public string Cliente { get; set; } = null!;
    public string Ciudad { get; set; } = null!;
    public string Nit { get; set; } = null!;
    public float TotalFactura { get; set; }
    public float SubTotal { get; set; }
    public float Iva { get; set; }
    public float Retencion { get; set; }
    public string FechaCreacion { get; set; } = null!;
    public string Estado { get; set; } = null!;
    public Boolean Pagada { get; set; }
    public string FechaPago { get; set; } = null!;
}