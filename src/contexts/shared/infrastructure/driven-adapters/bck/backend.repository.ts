import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { BackendOptions } from './backend.options.ts';
import { ExceptionMessagesConstants } from '@shared/domain/model/exception/exception-messages.constants.ts';
import { LoaderUseCase } from '@shared/domain/usecase/loader.use-case.ts';
import type { BckDefaultResponse } from '@shared/infrastructure/driven-adapters/bck/arguments/bck-default.response.ts';

/**
 * A repository class for handling backend requests.
 */
export class BackendRepository {
    /**
     * Builds the configuration for an Axios request to the backend.
     * @param options - Optional configuration for the backend request, including base URL and signal for aborting requests.
     * @returns An AxiosRequestConfig object containing the base URL and signal.
     */
    private static buildRequestConfig(options?: BackendOptions): AxiosRequestConfig {
        const baseURL = options?.baseURL ?? import.meta.env.VITE_BACKEND_BASE_URL;
        return {
            baseURL,
            signal: options?.signal,
        };
    }

    /**
     * Processes an error that occurs during a backend request.
     * @param e - The error that occurred, which can be an AxiosError or a generic Error.
     * @param options - Optional configuration for error handling, including whether to execute a custom error callback.
     * @returns An object containing the error message and status code.
     */
    private processError(e: unknown, options?: BackendOptions): { message: string; status: number } {
        const executeErrorCallback = options?.executeErrorCallback ?? true;
        let status: number = 500;
        let message: string = ExceptionMessagesConstants.Internal_Server_Error;
        if (
            e instanceof AxiosError &&
            e.response?.data &&
            typeof e.response.data === 'object' &&
            e.response.data.message
        ) {
            message = e.response.data.message;
            status = e.status ?? status;
        } else if (e instanceof Error) {
            message = e.message;
        }
        if (executeErrorCallback) {
            if (options?.customErrorCallback) {
                options.customErrorCallback(message, options?.customErrorMessage);
            }
        }
        return { message, status };
    }

    /**
     * Sends a GET request to the backend.
     * @param options - The options for the backend request, including the URL and any additional configurations.
     * @param query - Optional query parameters to include in the request.
     * @returns A promise that resolves to the response data of type `Res` or `undefined` if an error occurs.
     */
    public async get<Res extends BckDefaultResponse, Req extends Record<string, unknown> = never>(
        options: BackendOptions,
        query?: Req,
    ): Promise<Res | undefined> {
        const process = (options.createLoaderProcess ?? true) ? LoaderUseCase.addLoaderProcess() : undefined;
        try {
            const config: AxiosRequestConfig = BackendRepository.buildRequestConfig(options);
            if (query) config.params = query;
            return await axios.get<Res>(String(options.URL), config).then((res: AxiosResponse<Res>) => res.data);
        } catch (e: unknown) {
            this.processError(e, options);
            return undefined;
        } finally {
            if (process) LoaderUseCase.removeLoaderProcess(process);
        }
    }
}
