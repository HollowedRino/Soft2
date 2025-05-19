function Coupons() {
    const coupons = [
      { id: 1, code: "DESCUENTO10", description: "10% de descuento en tu próxima compra" },
      { id: 2, code: "ENVIOGRATIS", description: "Envío gratis en pedidos mayores a S/50" },
    ];
  
    return (
      <div>
        <h2 className="text-2xl font-semibold text-green-700 mb-6">Cupones Disponibles</h2>
        {coupons.length > 0 ? (
          <ul className="list-disc list-inside text-lg space-y-1">
            {coupons.map((coupon) => (
              <li key={coupon.id}>
                <strong>{coupon.code}:</strong> {coupon.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg">No tienes cupones disponibles en este momento.</p>
        )}
      </div>
    );
  }

  export default Coupons;