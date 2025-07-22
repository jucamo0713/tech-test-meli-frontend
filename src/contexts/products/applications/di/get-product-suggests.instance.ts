import { BackendRepositoryInstance } from '@shared/application/di/backend-repository.instance.ts';
import { GetProductSuggestsUseCase } from '@products/domain/usecase/get-product-suggests.use-case.ts';

export const GetProductSuggestsInstance = new GetProductSuggestsUseCase(BackendRepositoryInstance);
