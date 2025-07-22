import type { BackendRepository } from '@shared/infrastructure/driven-adapters/bck/backend.repository.ts';
import type { Product } from '@products/domain/model/product.ts';
import { BackendUrlConstants } from '@shared/infrastructure/driven-adapters/bck/backend-url.constants.ts';

/**
 * Use case for retrieving a product by its ID.
 */
export class GetProductByIdUseCase {
    /**
     * Constructor for the GetProductByIdUseCase.
     * @param repository - The repository to interact with the backend.
     */
    constructor(private readonly repository: BackendRepository) {}

    /**
     * Executes the use case to get a product by its ID.
     * @param productId - The ID of the product to retrieve.
     * @param signal - An optional AbortSignal to cancel the request if needed.
     * @returns A promise that resolves to the product data if found, or undefined if not found or an error occurs.
     */
    public async execute(productId: string, signal: AbortSignal): Promise<Product | undefined> {
        const data = await this.repository.get<{ data: Product; success: boolean }, { id: string }>(
            {
                URL: BackendUrlConstants.GET_PRODUCT_BY_ID,
                signal,
            },
            { id: productId },
        );
        return data?.data;
    }
}
