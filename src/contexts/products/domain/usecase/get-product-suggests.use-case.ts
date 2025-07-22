import type { BackendRepository } from '@shared/infrastructure/driven-adapters/bck/backend.repository.ts';
import type { Product } from '@products/domain/model/product.ts';
import { BackendUrlConstants } from '@shared/infrastructure/driven-adapters/bck/backend-url.constants.ts';

/**
 * Use case to get product suggestions based on a given product ID.
 */
export class GetProductSuggestsUseCase {
    /**
     * Constructor for the GetProductSuggestsUseCase.
     * @param repository - The backend repository to interact with the backend services.
     */
    constructor(private readonly repository: BackendRepository) {}

    /**
     * Executes the use case to retrieve product suggestions based on a product ID.
     * @param productId - The ID of the product for which suggestions are to be retrieved.
     * @param signal - An AbortSignal to cancel the request if needed.
     * @returns A promise that resolves to an array of Product objects representing the suggested products.
     */
    public async execute(productId: string, signal: AbortSignal): Promise<Product[]> {
        const data = await this.repository.get<{ data: Product[]; success: boolean }, { id: string }>(
            {
                URL: BackendUrlConstants.GET_PRODUCTS_RECOMMENDED,
                signal,
            },
            { id: productId },
        );
        return data?.data ?? [];
    }
}
