import { BackendRepositoryInstance } from '@shared/application/di/backend-repository.instance.ts';
import { GetShopByIdUseCase } from '../../domain/usecase/get-shop-by-id.use-case.ts';

export const GetShopByIdInstance = new GetShopByIdUseCase(BackendRepositoryInstance);
