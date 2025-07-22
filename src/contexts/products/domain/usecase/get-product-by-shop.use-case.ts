import type { BackendRepository } from '@shared/infrastructure/driven-adapters/bck/backend.repository.ts';
import type { Product } from '@products/domain/model/product.ts';
import { BackendUrlConstants } from '@shared/infrastructure/driven-adapters/bck/backend-url.constants.ts';

/**
 * Use case to get products by shop ID.
 */
export class GetProductByShopUseCase {
    /**
     * Constructor for the GetProductByShopUseCase.
     * @param repository - The backend repository to interact with the backend services.
     */
    constructor(private readonly repository: BackendRepository) {}

    /**
     * Executes the use case to retrieve products by shop ID.
     * @param shopId - The ID of the shop for which products are to be retrieved.
     * @param signal - An AbortSignal to cancel the request if needed.
     * @returns A promise that resolves to an array of Product objects associated with the specified shop ID.
     */
    public async execute(shopId: string, signal: AbortSignal): Promise<Product[]> {
        const data = await this.repository.get<{ data: Product[]; success: boolean }, { id: string }>(
            {
                URL: BackendUrlConstants.GET_PRODUCTS_BY_SHOP,
                signal,
            },
            { id: shopId },
        );
        return data?.data ?? [];
    }
}
