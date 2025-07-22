import type { BackendRepository } from '@shared/infrastructure/driven-adapters/bck/backend.repository.ts';
import { BackendUrlConstants } from '@shared/infrastructure/driven-adapters/bck/backend-url.constants.ts';
import type { Shop } from '../model/shop.ts';

/**
 * UseCase to get a shop by its ID.
 */
export class GetShopByIdUseCase {
    /**
     * @param repository - The backend repository to interact with the backend services.
     */
    constructor(private readonly repository: BackendRepository) {}

    /**
     * Executes the use case to retrieve a shop by its ID.
     * @param shopId - The ID of the shop to retrieve.
     * @param signal - An AbortSignal to cancel the request if needed.
     * @returns A promise that resolves to the Shop object if found, or undefined if not found.
     */
    public async execute(shopId: string, signal: AbortSignal): Promise<Shop | undefined> {
        const data = await this.repository.get<{ data: Shop; success: boolean }, { id: string }>(
            {
                URL: BackendUrlConstants.GET_SHOP_BY_ID,
                signal,
            },
            { id: shopId },
        );
        return data?.data;
    }
}
