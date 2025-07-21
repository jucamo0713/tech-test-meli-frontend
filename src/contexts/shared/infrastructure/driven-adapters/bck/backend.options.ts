import { BackendUrlConstants } from './backend-url.constants.ts';

/**
 * Type representing configuration options for backend API requests.
 * This type defines the structure for options that can be passed to configure backend communication.
 */
export interface BackendOptions {
    /**
     * The URL endpoint for the backend request, represented by constants from `BackendUrlConstants`
     */
    URL: BackendUrlConstants;
    /**
     * The base URL for the backend API. This can be used to override the default base URL.
     */
    baseURL?: string;
    /**
     * Determines if a loading process should be created during the request. Defaults to `true`.
     */
    createLoaderProcess?: boolean;
    /**
     * A callback function that handles custom error messages.
     * @param message - The default error message to be displayed.
     * @param customErrorMessage - An optional custom error message for more specific error handling.
     */
    customErrorCallback?: (message: string, customErrorMessage?: string) => unknown;
    /**
     * A custom error message to be used if an error occurs during the request.
     */
    customErrorMessage?: string;
    /**
     * Indicates whether an error callback function should be executed if an error occurs. Defaults to `true`.
     */
    executeErrorCallback?: boolean;
    /**
     * An optional AbortSignal to cancel the request if needed.
     */
    signal?: AbortSignal;
}
