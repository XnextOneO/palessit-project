// CartPage.tsx
import { useCart, Product } from '../services/cart-context.tsx';

const CartItem: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <div>
            <h3>{product.name}</h3>
            <p>{`Цена: $${product.price}`}</p>
        </div>
    );
};

export default function CartPage() {
    const { cartItems } = useCart(); // Получаем массив товаров из контекста корзины

    return (
        <div>
            <h1>Корзина</h1>
            {cartItems.map((product) => (
                <CartItem key={product.id} product={product} />
            ))}
        </div>
    );
}
