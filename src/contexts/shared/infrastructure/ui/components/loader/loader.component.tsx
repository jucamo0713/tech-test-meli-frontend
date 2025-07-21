import './loader.component.css';
import { type JSX, useEffect, useState } from 'react';
import { Observable } from 'rxjs';

/**
 * LoaderComponent is a component that displays a loading indicator.
 * It can operate in both global and relative contexts depending on the parameters.
 * @param params - The parameters for configuring the loader component.
 * @param params.initialState - The initial loading state.
 * @param [params.$loaderIndicator] - An observable that controls the loading state.
 * @param [params.centerElement] - Optional JSX element to display at the center of the loader.
 * @param [params.isGlobal] - Determines if the loader should be positioned globally (absolute) or relatively.
 * @param [params.biggerImage] - Optional flag to use a larger loading image.
 * @returns A JSX element that represents the loading indicator.
 */
export function LoaderComponent(params: {
    initialState: boolean;
    $loaderIndicator?: Observable<boolean>;
    biggerImage?: boolean;
    centerElement?: JSX.Element;
    isGlobal?: boolean;
}) {
    const [isLoading, setIsLoading] = useState(params.initialState);
    useEffect(() => {
        let beforeValue = params.initialState;
        const subscription = params.$loaderIndicator?.subscribe({
            next: (v) => {
                if (beforeValue !== v) {
                    setIsLoading(v);
                    beforeValue = v;
                }
            },
        });
        return () => subscription?.unsubscribe();
    }, [params.$loaderIndicator, params.initialState]);
    if (isLoading)
        return (
            <div
                style={
                    params.isGlobal
                        ? {
                              backgroundColor: 'rgba(0,0,0,0.3)',
                              position: 'fixed',
                              zIndex: Number.MAX_SAFE_INTEGER,
                          }
                        : {}
                }
                className="loader-container w-full h-full flex justify-center items-center"
            >
                <span
                    className={`loader ${params.isGlobal ? 'loader-absolute' : ''} relative box-border aspect-square flex justify-center items-center rounded-[100%] bg-white`}
                />
            </div>
        );
    return <></>;
}
