import { LoaderUseCase } from '@shared/domain/usecase/loader.use-case.ts';
import { LoaderComponent } from '@shared/infrastructure/ui/components/loader/loader.component.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AppPathsConstants } from './app-paths.constants.ts';
import { TemplateComponent } from '@shared/infrastructure/ui/components/template/template.component.tsx';
import { ProductDetailPage } from '@products/infrastructure/ui/pages/detail/product-detail.page.tsx';

/**
 * Main application part.
 * @returns The rendered application component.
 */
function App() {
    return (
        <>
            <LoaderComponent
                isGlobal={true}
                initialState={true}
                $loaderIndicator={LoaderUseCase.$GlobalLoaderObserver}
            />
            <BrowserRouter>
                <Routes>
                    <Route path={AppPathsConstants.BASE} element={<TemplateComponent />}>
                        <Route path={AppPathsConstants.PRODUCTS} element={<ProductDetailPage />}></Route>
                        <Route index element={<Navigate to={`${AppPathsConstants.BASE}/1`} />} />
                    </Route>
                    <Route path="*" element={<Navigate to={`${AppPathsConstants.BASE}/1`} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
