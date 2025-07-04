import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MyCartPage } from '../medifast/Pages/MyCartPage.jsx';
import { CartContext } from '../contexts/CartProvider.jsx';
import { UserContext } from '../contexts/UserProvider.jsx';

function renderWithContexts(cartContextValue, userContextValue = { user: { nombre: 'Test User' } }) {
  return render(
    <MemoryRouter>
      <UserContext.Provider value={userContextValue}>
        <CartContext.Provider value={cartContextValue}>
          <MyCartPage />
        </CartContext.Provider>
      </UserContext.Provider>
    </MemoryRouter>
  );
}

const mockCartItems = [
  {
    medicamento: { id: 1, nombre: 'Paracetamol', precio: 10, categoria: 'Analgésico' },
    cantidad: 2,
  },
];

describe('Funcionalidad de MyCartPage para cupones de usuario', () => {
  test('Aplica un cupón válido y muestra mensaje de descuento aplicado', () => {
    const contextValue = {
      cartItems: mockCartItems,
      coupon: 'DESCUENTO10',
      applyCoupon: jest.fn(code => code === 'DESCUENTO10'),
      getDiscount: jest.fn(total => 5),
    };
    renderWithContexts(contextValue);

    const input = screen.getByPlaceholderText(/código de cupón/i);
    fireEvent.change(input, { target: { value: 'DESCUENTO10' } });

    const button = screen.getByRole('button', { name: /aplicar/i });
    fireEvent.click(button);

    expect(contextValue.applyCoupon).toHaveBeenCalledWith('DESCUENTO10');
    expect(screen.getByText(/cupón aplicado correctamente/i)).toBeInTheDocument();
    expect(screen.getByText(/descuento/i)).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.replace(/\s/g, '').includes('-S/5.00'))
    ).toBeInTheDocument();
  });

  test('Muestra mensaje de error cuando se ingresa un cupón inválido', () => {
    const contextValue = {
      cartItems: mockCartItems,
      coupon: null,
      applyCoupon: jest.fn(() => false),
      getDiscount: jest.fn(() => 0),
    };
    renderWithContexts(contextValue);

    const input = screen.getByPlaceholderText(/código de cupón/i);
    fireEvent.change(input, { target: { value: 'INVALIDO' } });

    const button = screen.getByRole('button', { name: /aplicar/i });
    fireEvent.click(button);

    expect(contextValue.applyCoupon).toHaveBeenCalledWith('INVALIDO');
    expect(screen.getByText(/cupón inválido/i)).toBeInTheDocument();
    expect(screen.queryByText(/cupón aplicado correctamente/i)).not.toBeInTheDocument();
  });

  test('Deshabilita input y botón tras aplicar cupón válido y actualiza el total', () => {
    const contextValue = {
      cartItems: mockCartItems,
      coupon: 'DESCUENTO10',
      applyCoupon: jest.fn(() => true),
      getDiscount: jest.fn(() => 5),
    };
    renderWithContexts(contextValue);

    const input = screen.getByPlaceholderText(/código de cupón/i);
    expect(input).toBeDisabled();

    const button = screen.getByRole('button', { name: /aplicar/i });
    expect(button).toBeDisabled();

    expect(
      screen.getByText((content) => content.replace(/\s/g, '') === 'S/20.00')
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.replace(/\s/g, '') === '-S/5.00')
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.replace(/\s/g, '') === 'S/15.00')
    ).toBeInTheDocument();
  });
});