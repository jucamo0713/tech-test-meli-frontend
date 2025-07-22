import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import type { Product } from '@products/domain/model/product.ts';
import { FormatterUseCase } from '@shared/domain/usecase/formatter.use-case.ts';
import { Link } from 'react-router';

/**
 * MultiProductsCarouselComponent
 * @param props - Component properties
 * @param props.products - Array of products to display in the carousel
 * @returns a JSX element representing a carousel of products
 */
export function MultiProductsCarouselComponent({ products }: { products: Product[] }) {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        breakpoints: {
            '(min-width: 1024px)': {
                slides: { perView: 4, spacing: 20 },
            },
            '(min-width: 640px)': {
                slides: { perView: 2, spacing: 12 },
            },
            '(min-width: 768px)': {
                slides: { perView: 3, spacing: 16 },
            },
        },
        loop: false,
        mode: 'free',
        slides: { perView: 1.4, spacing: 10 },
    });

    return (
        <div className="w-full">
            <div ref={sliderRef} className="keen-slider relative">
                {products.map((product) => {
                    const finalPrice = (product?.price ?? 0) - ((product?.price ?? 0) * (product?.discount ?? 0)) / 100;
                    return (
                        <Link
                            to={`/product/${product.id}`}
                            key={product.id}
                            className="keen-slider__slide bg-white rounded-md shadow border border-[#E6E6E6] flex flex-col gap-2 max-w-[250px]"
                        >
                            <img
                                src={product.imagesPath[0]}
                                alt={product.name}
                                className="object-contain aspect-square"
                            />
                            <div className="p-2 flex flex-col gap-1">
                                {product?.discount && product?.discount > 0 ? (
                                    <>
                                        <span className="line-through text-[11px] text-[#7A7A7A]">
                                            {FormatterUseCase.formatCurrency(product?.price ?? 0)}
                                        </span>
                                        <div className="flex gap-1 items-end justify-start">
                                            <span className="text-[20px] leading-[20px]">
                                                {FormatterUseCase.formatCurrency(finalPrice)}
                                            </span>
                                            <span className="text-[#12AC5C] leading-[18px] text-[12px] font-semibold">
                                                {product.discount}% OFF
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <span className="text-[30px]">
                                        {FormatterUseCase.formatCurrency(product?.price ?? 0)}
                                    </span>
                                )}
                                {product?.maxInterestFreeInstallments && product?.maxInterestFreeInstallments > 1 && (
                                    <div className="text-[12px]">
                                        en{' '}
                                        <span className="text-[#12AC5C] text-[14px]">
                                            {product.maxInterestFreeInstallments} cuotas de{' '}
                                            {FormatterUseCase.formatCurrency(
                                                finalPrice / product.maxInterestFreeInstallments,
                                            )}{' '}
                                            con 0% de interés
                                        </span>
                                    </div>
                                )}
                                {product?.shippingPrice === 0 && (
                                    <span className="text-[#12AC5C] text-[12px]"> Envió Gratis</span>
                                )}
                                <p className="text-sm">{product.name}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
