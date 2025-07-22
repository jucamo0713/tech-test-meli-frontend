import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Product } from '@products/domain/model/product.ts';
import type { Shop } from '../../../../../shop/domain/model/shop.ts';
import { CarouselComponent } from '@products/infrastructure/ui/components/carousel/carousel.component.tsx';
import { FormatterUseCase } from '@shared/domain/usecase/formatter.use-case.ts';
import { BiUndo } from 'react-icons/bi';
import { RiShieldCheckLine } from 'react-icons/ri';
import { IoHeartOutline, IoShareSocialOutline } from 'react-icons/io5';
import type { Characteristic, CharacteristicNested } from '@products/domain/model/characteristic.ts';
import { FiCheckCircle, FiChevronRight, FiX } from 'react-icons/fi';
import { CharacteristicsComponent } from '@products/infrastructure/ui/components/characteristics/characteristics.component.tsx';
import { MultiProductsCarouselComponent } from '@products/infrastructure/ui/components/carousel/multi-products-carousel.component.tsx';
import { ShopCardComponent } from '../../../../../shop/infrastructure/ui/components/shop-card.component.tsx';
import { PhotoViewerComponent } from '@products/infrastructure/ui/components/carousel/photo-viewer.component.tsx';
import { PaymentsMethodsListComponent } from '@products/infrastructure/ui/components/payments-methods/payments-methods-list.component.tsx';
import { AsksComponent } from '@products/infrastructure/ui/components/asks/asks-component.tsx';
import { StarsComponent } from '@products/infrastructure/ui/components/stars/stars.component.tsx';
import { useParams } from 'react-router';
import { GetProductByIdInstance } from '@products/applications/di/get-product-by-id.instance.ts';
import { GetProductSuggestsInstance } from '@products/applications/di/get-product-suggests.instance.ts';
import { GetProductByShopInstance } from '@products/applications/di/get-product-by-shop.instance.ts';
import { GetShopByIdInstance } from '../../../../../shop/applications/di/get-shop-by-id.instance.ts';

/**
 * ProductDetailPage component
 * @returns A JSX element representing the product detail page.
 */
export function ProductDetailPage() {
    const [selectedCharacteristic, setSelectedCharacteristic] = useState(0);
    const { id } = useParams();
    useEffect(() => {
        window.scrollTo({ behavior: 'smooth', top: 0 });
    }, [id]);
    const [product, setProduct] = useState<Product | undefined>();
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    useEffect(() => {
        if (id) {
            const aborter = new AbortController();
            void GetProductByIdInstance.execute(id, aborter.signal).then((r) => setProduct(r));
            void GetProductSuggestsInstance.execute(id, aborter.signal).then((r) => setRelatedProducts(r));
            return () => {
                aborter.abort();
            };
        }
    }, [id]);
    const [shoppProducts, setShoppProducts] = useState<Product[]>([]);
    const [shop, setShop] = useState<Shop | undefined>({
        bannerPath: 'https://http2.mlstatic.com/D_NQ_NP_947281-MLA77787733951_072024-OO.jpg',
        followers: 1000,
        id: '1',
        imagePath: 'https://http2.mlstatic.com/D_NQ_NP_769433-MLA77570437228_072024-G.jpg',
        isOfficial: true,
        name: 'Karcher',
        productsCount: 50,
        rating: 4.9,
        sellUnits: 5000,
    });
    useEffect(() => {
        if (product?.shopId) {
            const aborter = new AbortController();
            void GetShopByIdInstance.execute(product?.shopId, aborter.signal).then((r) => setShop(r));
            void GetProductByShopInstance.execute(product?.shopId, aborter.signal).then((r) => setShoppProducts(r));
            return () => {
                aborter.abort();
            };
        }
    }, [product?.shopId]);
    const finalPrice = useMemo(
        () => (product?.price ?? 0) - ((product?.price ?? 0) * (product?.discount ?? 0)) / 100,
        [product?.price, product?.discount],
    );
    const [isOpenQuantity, setIsOpenQuantity] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const selectQuantity = (value: number) => {
        setQuantity(value);
        setIsOpenQuantity(false);
    };
    const toggleDropdown = useCallback(() => setIsOpenQuantity((prev) => !prev), [setIsOpenQuantity]);
    const [rootCharacteristics, groupings] = useMemo(() => {
        if (!product?.characteristics) return [[], []];
        const rootCharacteristics: Characteristic[] = [];
        const groupings: CharacteristicNested[] = [];
        Object.entries(product.characteristics).forEach(([key, value]) => {
            if (typeof value === 'string') {
                rootCharacteristics.push({ label: key, value });
            } else if (typeof value === 'object') {
                groupings.push({ label: key, value: Object.entries(value).map(([k, v]) => ({ label: k, value: v })) });
            }
        });
        return [rootCharacteristics, groupings];
    }, [product?.characteristics]);
    const [CharacteristicsOpen, setCharacteristicsOpen] = useState(false);
    const [showPhotoViewer, setShowPhotoViewer] = useState(false);
    const [photoViewerInitialIndex, setPhotoViewerInitialIndex] = useState(0);
    return (
        <main className="bg-[#EDEDED]">
            <article className="bg-white w-full p-4">
                {shop?.isOfficial && (
                    <section className="flex items-center justify-start gap-1 mb-2 ">
                        <img src={shop.imagePath} height="24" width="24" alt={shop.name} />
                        <span className="text-[#3483FA]">Visita la tienda oficial de {shop.name}</span>
                        <img src="https://http2.mlstatic.com/frontend-assets/vpp-frontend/cockade.svg" alt="verified" />
                    </section>
                )}
                <section className="flex items-center justify-between text-[#737373]">
                    <div>
                        {product?.status} | {product?.sellUnits} vendidos
                    </div>
                    <div className="flex items-center gap-1">
                        <span>{product?.rating}</span>
                        <StarsComponent rating={product?.rating ?? 0} />
                        <span>({product?.totalRates})</span>
                    </div>
                </section>
                {product?.mostShipped && (
                    <section className="flex items-center justify-start mt-2 gap-2">
                        <div className="bg-[#FF7733] rounded px-1 text-white font-bold text-[9px] flex items-center justify-center">
                            MÁS VENDIDO
                        </div>
                        <span className="text-[#3483FA]">
                            {product.ranking}° en {product.category}
                        </span>
                    </section>
                )}
                <section>
                    <h1 className="text-md font-bold mt-2">{product?.name}</h1>
                    <CarouselComponent images={product?.imagesPath ?? []} />
                </section>
                {product?.selectableCharacteristicLabel && (
                    <section>
                        {product.selectableCharacteristicLabel}:{' '}
                        <span className="font-bold">{product.selectableCharacteristics[selectedCharacteristic]}</span>
                        {product.selectableCharacteristics.length > 1 && (
                            <div className="flex items-center gap-2 mt-2 justify-around flex-wrap">
                                {product.selectableCharacteristics.map((characteristic, index) => (
                                    <button
                                        className="rounded-r-full rounded-l-full bg-gray-200/80 px-2 py-0.5 cursor-pointer max-w-20 line-clamp-1"
                                        key={index}
                                        onClick={() => setSelectedCharacteristic(index)}
                                    >
                                        {characteristic}
                                    </button>
                                ))}
                            </div>
                        )}
                    </section>
                )}
                <section className="mt-5">
                    {product?.discount && product?.discount > 0 ? (
                        <>
                            <span className="line-through text-[#7A7A7A]">
                                {FormatterUseCase.formatCurrency(product?.price ?? 0)}
                            </span>
                            <div className="flex gap-1 items-end justify-start">
                                <span className="text-[30px] leading-[30px]">
                                    {FormatterUseCase.formatCurrency(finalPrice)}
                                </span>
                                <span className="text-[#12AC5C] leading-[28px] text-[20px] font-semibold">
                                    {product.discount}% OFF
                                </span>
                            </div>
                        </>
                    ) : (
                        <span className="text-[30px]">{FormatterUseCase.formatCurrency(product?.price ?? 0)}</span>
                    )}
                    {product?.maxInterestFreeInstallments && product?.maxInterestFreeInstallments > 1 && (
                        <div>
                            en{' '}
                            <span className="text-[#12AC5C] text-[16px] font-black">
                                {product.maxInterestFreeInstallments} cuotas de{' '}
                                {FormatterUseCase.formatCurrency(finalPrice / product.maxInterestFreeInstallments)} con
                                0% de interés
                            </span>
                        </div>
                    )}
                </section>
                <section>
                    <div>
                        {product?.hasCardDiscount && (
                            <div className="bg-[#D9E7FA] w-fit p-2 rounded mt-2 text-[#3483FA] font-semibold">
                                {product.cardValueDiscount}% OFF {product.cardDiscount}
                            </div>
                        )}
                        <span className="text-[#3483FA] my-3">Ver medios de pago y promociones</span>
                    </div>
                    <div className="mt-5">
                        <p>
                            {product?.shippingPrice === 0 ? (
                                <span className="text-[#12AC5C] text-[16px] font-black"> Envio Gratis</span>
                            ) : (
                                'Envio'
                            )}{' '}
                            a todo el país
                        </p>
                        <p className="text-[#7A7A7A]">Conoce los tiempos y las formas de envío.</p>
                        <p className="text-[#3483FA]">Calcular cuándo llega</p>
                    </div>
                </section>
                <section className="mt-5">
                    <h2 className="text-[15px] font-bold">Stock disponible</h2>
                    <button
                        onClick={toggleDropdown}
                        className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2 text-left text-sm text-gray-900 focus:outline-none"
                    >
                        Cantidad: {quantity}
                        <span className="text-gray-400 ml-1">(+{product?.stock} disponibles)</span>
                    </button>

                    {isOpenQuantity && (
                        <>
                            <ul className="hidden sm:block sm:absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-h-48 overflow-auto">
                                {Array.from({ length: Math.min(6, product?.stock ?? 0) }).map((_, idx) => (
                                    <li
                                        key={idx + 1}
                                        onClick={() => selectQuantity(idx + 1)}
                                        className={`px-4 py-2  text-sm cursor-pointer ${
                                            quantity === idx + 1
                                                ? 'bg-gray-200 text-gray-900 font-semibold'
                                                : 'hover:bg-gray-100 text-gray-900'
                                        }`}
                                    >
                                        {idx + 1} {idx === 0 ? 'unidad' : 'unidades'}
                                    </li>
                                ))}
                            </ul>
                            <div className="sm:hidden fixed bottom-0 z-20 left-0 w-full bg-white border border-gray-300 rounded shadow-lg">
                                <div className="px-4 py-2 border-b border-gray-200 text-sm font-medium text-gray-700">
                                    Elige cantidad
                                </div>
                                <ul className="max-h-60 overflow-y-auto">
                                    {Array.from({ length: Math.min(6, product?.stock ?? 0) }).map((_, idx) => (
                                        <li
                                            key={idx + 1}
                                            onClick={() => selectQuantity(idx + 1)}
                                            className={`px-4 py-2 text-sm cursor-pointer ${
                                                quantity === idx + 1
                                                    ? 'bg-gray-200 text-gray-900 font-semibold'
                                                    : 'hover:bg-gray-100 text-gray-900'
                                            }`}
                                        >
                                            {idx + 1} {idx === 0 ? 'unidad' : 'unidades'}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </section>
                <section className="mt-5">
                    <button className="w-full bg-[#3483FA] text-white font-bold py-2 rounded hover:bg-[#2969b8]">
                        Comprar ahora
                    </button>
                    <button className="w-full bg-[#E3EDFB] text-[#3483FA] font-bold py-2 rounded mt-2 hover:bg-gray-300">
                        Agregar al carrito
                    </button>
                </section>
                <section className="mt-5">
                    {shop?.isOfficial ? (
                        <div className="flex items-center gap-2 mb-2">
                            <img src={shop.imagePath} alt={shop.name} className="aspect-square w-20" />
                            <div className="flex flex-col items-start gap-2 grow">
                                <p className="text-[10px] flex line-clamp-1 gap-1 w-full">
                                    Vendido por <span className=" font-bold text-[#3483FA]">{shop?.name}</span>
                                    <img
                                        src="https://http2.mlstatic.com/frontend-assets/vpp-frontend/cockade.svg"
                                        alt="verified"
                                    />
                                </p>
                                <p className="font-semibold text-[10px]">{shop?.sellUnits} ventas</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-start gap-2">
                            <p className="text-[10px]">
                                Vendido por <span className="font-bold text-[#3483FA]">{shop?.name}</span>
                            </p>
                            <p className="font-semibold text-[10px]">{shop?.sellUnits} ventas</p>
                        </div>
                    )}
                    <div className="text-sm text-gray-700 space-y-2">
                        <div className="flex items-start gap-2">
                            <BiUndo className="text-xl mt-0.5 text-gray-500" />
                            <p>
                                <a href="#" className="text-blue-600 hover:underline">
                                    Devolución gratis
                                </a>
                                . Tienes 30 días desde que lo recibes.
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <RiShieldCheckLine className="text-xl mt-0.5 text-gray-500" />
                            <p>
                                <a href="#" className="text-blue-600 hover:underline">
                                    Compra Protegida
                                </a>
                                , recibe el producto que esperabas o te devolvemos tu dinero.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="mt-5 flex justify-evenly border-b-gray-200 border-b">
                    <div className="font-bold p-2 text-center flex gap-2 text-[#5A9AF9] items-center">
                        <IoHeartOutline color="#5A9AF9" size={20} />
                        Agregar a favoritos
                    </div>
                    <div className="font-bold p-2 text-center flex gap-2 text-[#5A9AF9] items-center">
                        <IoShareSocialOutline color="#5A9AF9" size={20} />
                        Compartir
                    </div>
                </section>
                <section className="border-b-gray-200 border-b">
                    <h2 className="text-[18px] font-semibold my-5 ">Lo que tienes que saber de este producto</h2>
                    <ul className="list-disc list-outside pl-4 space-y-2 [&>li]:marker:text-[#C0C0C0]">
                        {product?.information.map((info, i) => (
                            <li className="my-3 text-[13px] leading-relaxed" key={i}>
                                {info}
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="border-b-gray-200 border-b py-3">
                    <h2 className="text-[18px] font-semibold mb-4">Características del producto</h2>
                    <ul className="space-y-4">
                        {rootCharacteristics.map((item, index) => (
                            <li key={index} className="flex items-center gap-4">
                                <div className="bg-gray-100 rounded-full p-3">
                                    <FiCheckCircle className="text-gray-700 text-[15px]" />
                                </div>
                                <p className="text-gray-800">
                                    {item.label}: <span className="font-semibold">{item.value}</span>
                                </p>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setCharacteristicsOpen(true)}
                        className="w-full flex items-center justify-between border border-gray-200 rounded-md px-4 py-3 my-5 text-blue-600 hover:bg-gray-50 transition cursor-pointer"
                    >
                        <span className="text-sm font-medium">Ver todas las características</span>
                        <FiChevronRight className="text-blue-600" />
                    </button>

                    {CharacteristicsOpen && (
                        <div className="fixed inset-0 z-50 bg-white flex flex-col">
                            <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-5 bg-white shadow-md">
                                <h2 className="text-base font-semibold">Características del producto</h2>
                                <button onClick={() => setCharacteristicsOpen(false)}>
                                    <FiX className="text-2xl text-blue-600 hover:text-black" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto px-4 py-2">
                                <CharacteristicsComponent groups={groupings} rootChars={rootCharacteristics} />
                            </div>
                        </div>
                    )}
                </section>
                <section className="border-b-gray-200 border-b pt-3 pb-8">
                    <h2 className="text-[18px] font-semibold">Productos Relacionados</h2>
                    <p className="text-[#8D8D8D] text-[11px] mb-4">Promocionado</p>
                    <MultiProductsCarouselComponent products={relatedProducts} />
                </section>
                <section className="border-b-gray-200 border-b py-8">
                    {shop && <ShopCardComponent shop={shop} />}
                </section>
                <section className="border-b-gray-200 border-b pt-3 pb-8">
                    <h2 className="text-[18px] font-semibold">Productos del vendedor</h2>
                    <MultiProductsCarouselComponent products={shoppProducts} />
                </section>
                <section className="border-b-gray-200 border-b py-8">
                    <h2 className="text-[18px] font-semibold mb-4">Imágenes del producto</h2>
                    <div className="flex flex-col gap-4 mb-4">
                        {product?.imagesPath.slice(0, 2).map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Imagen del producto ${index + 1}`}
                                className="w-full h-auto object-cover rounded-md"
                            />
                        ))}
                    </div>

                    {product?.imagesPath && product.imagesPath.length > 2 && (
                        <button
                            onClick={() => {
                                setShowPhotoViewer(true);
                                setPhotoViewerInitialIndex(0);
                            }}
                            className="w-full flex items-center justify-between border border-gray-200 rounded-md px-4 py-3 my-5 text-blue-600 hover:bg-gray-50 transition cursor-pointer"
                        >
                            <span className="text-sm font-medium">Ver más imágenes</span>
                            <FiChevronRight className="text-blue-600" />
                        </button>
                    )}

                    {product && showPhotoViewer && (
                        <PhotoViewerComponent
                            initialIndex={photoViewerInitialIndex}
                            onClose={() => setShowPhotoViewer(false)}
                            images={product.imagesPath}
                        />
                    )}
                </section>
                <section className="border-b-gray-200 border-b py-8">
                    <h2 className="text-[18px] font-semibold mb-4">Descripción</h2>
                    <p className="text-gray-700 text-sm leading-relaxed">{product?.description}</p>
                </section>
                <section className="border-b-gray-200 border-b py-8">
                    <PaymentsMethodsListComponent />
                    <button className="w-full flex items-center justify-between border border-gray-200 rounded-md px-4 py-3 my-5 text-blue-600 hover:bg-gray-50 transition cursor-pointer">
                        <span className="text-sm font-medium">Ver más medios de pago</span>
                        <FiChevronRight className="text-blue-600" />
                    </button>
                </section>
                <section className="border-b-gray-200 border-b py-8">
                    <h2 className="text-[18px] font-semibold mb-4">Preguntas y respuestas</h2>
                    <AsksComponent questions={product?.asks ?? []} />
                </section>
                <section>
                    <h2 className="text-[18px] font-semibold mb-4">Opiniones del producto</h2>
                    <div className="flex flex-col items-center gap-2 mb-4">
                        <span className="text-[#3483FA] font-extrabold text-[30px]">{product?.rating}</span>
                        <div className="flex">
                            <StarsComponent rating={product?.rating ?? 0} size="25" />
                        </div>
                        <span className="text-[#8D8D8D] text-[11px]">{product?.totalRates} calificaciones</span>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h3>Resumen de {product?.totalRates} opiniones generado por IA</h3>
                            <span className="text-gray-700">{product?.reviewsResume}</span>
                        </div>
                        {product?.reviews.map((review, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-md shadow-sm space-y-2">
                                <div className="flex">
                                    <StarsComponent rating={review?.punctuation ?? 0} size="25" />
                                </div>
                                <p className="text-gray-800">{review?.text}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </article>
        </main>
    );
}
