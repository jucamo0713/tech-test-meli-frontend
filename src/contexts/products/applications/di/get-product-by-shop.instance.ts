import { BackendRepositoryInstance } from '@shared/application/di/backend-repository.instance.ts';
import { GetProductByShopUseCase } from '@products/domain/usecase/get-product-by-shop.use-case.ts';

export const GetProductByShopInstance = new GetProductByShopUseCase(BackendRepositoryInstance);
