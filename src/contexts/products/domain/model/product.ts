import type { Review } from '@products/domain/model/review.ts';
import type { Asks } from '@products/domain/model/asks.ts';

export interface Product {
    asks: Asks[];
    category: string;
    characteristics: Record<string, string | Record<string, string>>;
    description: string;
    discount: number;
    hasCardDiscount: boolean;
    id: string;
    imagesPath: string[];
    information: string[];
    maxInterestFreeInstallments: number;
    mostShipped: boolean;
    name: string;
    navigation: string[];
    price: number;
    ranking: number;
    rating: number;
    reviews: Review[];
    reviewsResume: string;
    selectableCharacteristics: string[];
    sellUnits: number;
    shippingPrice: number;
    shopId: string;
    shortDescription: string;
    status: string;
    stock: number;
    totalRates: number;
    cardDiscount?: string;
    cardValueDiscount?: number;
    selectableCharacteristicLabel?: string;
}
