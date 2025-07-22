import { FaCheckCircle } from 'react-icons/fa';
import { PiMedalLight } from 'react-icons/pi';
import { HiOutlineExclamation, HiOutlineThumbDown, HiOutlineThumbUp, HiOutlineTruck } from 'react-icons/hi';
import type { Shop } from '../../../domain/model/shop.ts';

interface ShopCardProps {
    shop: Shop;
}

/**
 * Component to display a shop card with details like name, rating, followers, and products.
 * @param props - The properties for the ShopCardComponent.
 * @param props.shop - The shop object containing details to be displayed.
 * @returns A JSX element representing the shop card.
 */
export function ShopCardComponent({ shop }: ShopCardProps) {
    const thresholds = [
        { active: 'bg-red-500', color: 'bg-red-100' },
        { active: 'bg-orange-400', color: 'bg-orange-100' },
        { active: 'bg-yellow-300', color: 'bg-yellow-100' },
        { active: 'bg-lime-400', color: 'bg-lime-100' },
        { active: 'bg-green-600', color: 'bg-green-100' },
    ];

    const activeIndex = Math.min(Math.floor(shop.rating), 4);
    const level = Math.min(Math.floor(shop.rating), 4);

    const reputations = [
        {
            Icon: HiOutlineThumbDown,
            attention: 'Mala atención',
            color: 'text-red-500',
            delivery: 'Entrega con problemas',
        },
        {
            Icon: HiOutlineExclamation,
            attention: 'Atención regular',
            color: 'text-orange-500',
            delivery: 'Entrega a veces',
        },
        {
            Icon: HiOutlineTruck,
            attention: 'Atención promedio',
            color: 'text-yellow-600',
            delivery: 'Entrega promedio',
        },
        {
            Icon: HiOutlineThumbUp,
            attention: 'Buena atención',
            color: 'text-lime-600',
            delivery: 'Entrega oportuna',
        },
        {
            Icon: HiOutlineThumbUp,
            attention: 'Excelente atención',
            color: 'text-green-600',
            delivery: 'Entrega a tiempo',
        },
    ];

    const rep = reputations[Math.min(level, 4)];
    return (
        <div className="max-w-sm w-full bg-white rounded-lg shadow text-sm overflow-hidden">
            <div className="relative w-full">
                <img src={shop.bannerPath} alt="Banner" className="w-full aspect-[4/1] object-cover rounded-lg" />
                <img
                    src={shop.imagePath}
                    alt="Logo"
                    className="absolute -bottom-3 left-4 w-15 aspect-square rounded bg-white p-1"
                />
            </div>

            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">{shop.name}</div>
                    <button className="rounded bg-[#E3EDFB] text-[#3B88FA] px-2 py-1 font-semibold text-[12px]">
                        Seguir
                    </button>
                </div>

                {shop.isOfficial && (
                    <div className="text-xs flex items-center gap-2 text-gray-500 mb-2">
                        Tienda oficial de Mercado Libre{' '}
                        <FaCheckCircle className="text-blue-500" title="Tienda oficial" />
                    </div>
                )}

                <div className="flex gap-4 text-xs mb-4">
                    <span>+{shop.followers} Seguidores</span>
                    <span>+{shop.productsCount} Productos</span>
                </div>

                <div className="flex items-start gap-2 mb-2 text-green-600 font-medium">
                    <PiMedalLight size={20} />
                    <div>
                        <span>MercadoLíder Platinum</span>
                        <p className="text-xs text-gray-600 mb-3">¡Uno de los mejores del sitio!</p>
                    </div>
                </div>

                <div className="flex gap-1 mb-3">
                    {thresholds.map((t, idx) => (
                        <div
                            key={idx}
                            className={`h-2 flex-1 rounded-sm transition-all ${
                                idx === activeIndex ? t.active : t.color
                            }`}
                        ></div>
                    ))}
                </div>

                <div className="flex justify-between text-center text-xs text-gray-700">
                    <div>
                        <p className="font-semibold text-base">+{Math.floor(shop.sellUnits / 1000)} mil</p>
                        <p>Ventas concretadas</p>
                    </div>
                    <div>
                        <rep.Icon className={`mx-auto text-xl ${rep.color}`} />
                        <p>{rep.attention}</p>
                    </div>
                    <div>
                        <HiOutlineTruck className={`mx-auto text-xl ${rep.color}`} />
                        <p>{rep.delivery}</p>
                    </div>
                </div>
            </div>

            <button className="block text-center bg-blue-100 text-blue-700 font-black py-2 rounded-lg hover:bg-blue-200 transition cursor-pointer w-full">
                Ir a la Tienda oficial
            </button>
        </div>
    );
}
