import CuponService from '../../services/CuponService.js';


describe('CuponService', () => {
    // Happy Path: Crear y eliminar un cupón correctamente
    it('should create and delete a cupon successfully (Happy Path)', async () => {
        // PREPARAR
        const newCupon = {
            codigo: 'TEST123',
            descripcion: 'Cupón de prueba',
            descuento: 10.5
        };

        // EJECUTAR
        const created = await CuponService.create(newCupon);
        const deleted = await CuponService.delete(created.id);

        // VALIDAR
        expect(created).toHaveProperty('id');
        expect(created.codigo).toBe('TEST123');
        expect(deleted).toBe(true);
        await expect(CuponService.findById(created.id)).rejects.toThrow();
    });

    // Unhappy Path: Intentar eliminar un cupón inexistente
    it('should fail to delete a non-existent cupon (Unhappy Path)', async () => {
        // PREPARAR
        const nonExistentId = 999999;

        // EJECUTAR y VALIDAR
        await expect(CuponService.delete(nonExistentId)).rejects.toThrow('Cupon no encontrado');
    });

    // Unhappy Path: Intentar crear un cupón con datos inválidos
    it('should fail to create a cupon with invalid data (Unhappy Path)', async () => {
        // PREPARAR
        const invalidCupon = { codigo: null, descripcion: '', descuento: null };

        // EJECUTAR y VALIDAR
        await expect(CuponService.create(invalidCupon)).rejects.toThrow();
    });
});

