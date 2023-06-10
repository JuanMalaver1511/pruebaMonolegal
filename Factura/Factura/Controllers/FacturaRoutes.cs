using Factura.Models;
using Factura.Services;
using Microsoft.AspNetCore.Mvc;

namespace Factura.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FacturaRoutes : ControllerBase
{
    private readonly FacturaServices _facturaService;

    public FacturaRoutes(FacturaServices facturaService) =>
        _facturaService = facturaService;

    [HttpGet]
    public async Task<List<DatosFactura>> Get() =>
        await _facturaService.GetAsync();

    [HttpGet("{codigoFactura}")]
    public async Task<ActionResult<DatosFactura>> Get(string codigoFactura)
    {
        var datosFactura = await _facturaService.GetAsync(codigoFactura);

        if (datosFactura is null)
        {
            return NotFound();
        }

        return datosFactura;
    }

    [HttpPost]
    public async Task<IActionResult> Post(DatosFactura newFactura)
    {
        await _facturaService.CreateAsync(newFactura);

        return CreatedAtAction(nameof(Get), new { id = newFactura.Id }, newFactura);
    }

    [HttpPut("{codigoFactura}")]
    public async Task<IActionResult> Update(string codigoFactura, DatosFactura updatedFactura)
    {
        var datosFactura = await _facturaService.GetAsync(codigoFactura);

        if (datosFactura is null)
        {
            return NotFound();
        }

        updatedFactura.Id = datosFactura.Id;

        await _facturaService.UpdateAsync(codigoFactura, updatedFactura);

        return NoContent();
    }

    [HttpDelete("{codigoFactura}")]
    public async Task<IActionResult> Delete(string codigoFactura)
    {
        var datosFactura = await _facturaService.GetAsync(codigoFactura);

        if (datosFactura is null)
        {
            return NotFound();
        }

        await _facturaService.RemoveAsync(codigoFactura);

        return NoContent();
    }
}