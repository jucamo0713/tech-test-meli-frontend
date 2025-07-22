import { GetProductByIdUseCase } from '@products/domain/usecase/get-product-by-id.use-case.ts';
import { BackendRepositoryInstance } from '@shared/application/di/backend-repository.instance.ts';

export const GetProductByIdInstance = new GetProductByIdUseCase(BackendRepositoryInstance);
