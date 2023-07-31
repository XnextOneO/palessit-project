import { createContext, useContext, useState } from 'react';

// Определяем тип для товара
export interface Product {
    price: string;
    name: string;
    image: string;
    color: string;
    description: string;
    gender: string;
    id: string;
}

// Определяем тип для контекста корзины
interface CartContextProps {
    cartItems: Product[];
    addToCart: (product: Product) => void;
}

// Создаем контекст корзины
const CartContext = createContext<CartContextProps>({
    cartItems: [],
    addToCart: () => {0},
});
interface Props {
    children: React.ReactNode;
}

// Создаем хук, чтобы использовать контекст в компонентах
export const useCart = () => {
    return useContext(CartContext);
};

// Компонент-провайдер контекста корзины
export const CartProvider: React.FC<Props> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    // Функция для добавления товара в корзину
    const addToCart = (product: Product) => {
        setCartItems([...cartItems, product]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
