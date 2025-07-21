import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../src/applications/app.tsx';
import { type JSX } from 'react';
// Mock de componentes
vi.mock('@shared/infrastructure/ui/components/loader/loader.component.tsx', () => ({
    LoaderComponent: ({ isGlobal, initialState }: { initialState: boolean; isGlobal: boolean }) => (
        <div data-testid="loader" data-global={isGlobal} data-initial={initialState}>
            Loader
        </div>
    ),
}));

vi.mock('@shared/infrastructure/ui/components/template/template.component.tsx', () => ({
    TemplateComponent: () => <div>TemplateComponent</div>,
}));

vi.mock('@products/infrastructure/ui/pages/detail/product-detail.page.tsx', () => ({
    ProductDetailPage: () => <div>ProductDetailPage</div>,
}));

vi.mock('react-router', async () => {
    const actual = await vi.importActual<typeof import('react-router')>('react-router');
    return {
        ...actual,
        BrowserRouter: ({ children }: { children: JSX.Element }) => {
            return <div data-testid="router">{children}</div>;
        },
        Navigate: ({ to }: { to: string }) => <div data-testid="navigate">Redirect to {to}</div>,
        Route: ({ element, children }: { children: JSX.Element; element: JSX.Element }) => (
            <div data-testid="route">
                {element} {children}
            </div>
        ),
        Routes: ({ children }: { children: JSX.Element }) => <div data-testid="routes">{children}</div>,
    };
});

vi.mock('@shared/domain/usecase/loader.use-case.ts', () => ({
    LoaderUseCase: {
        $GlobalLoaderObserver: {}, // simulación completa
    },
}));

describe('App component', () => {
    it('should render the global LoaderComponent', () => {
        render(<App />);
        const loader = screen.getByTestId('loader');
        expect(loader).toBeInTheDocument();
        expect(loader).toHaveAttribute('data-global', 'true');
        expect(loader).toHaveAttribute('data-initial', 'true');
    });

    it('should wrap content in BrowserRouter and Routes', () => {
        render(<App />);
        expect(screen.getByTestId('router')).toBeInTheDocument();
        expect(screen.getByTestId('routes')).toBeInTheDocument();
    });

    it('should render the TemplateComponent and nested routes', () => {
        render(<App />);
        expect(screen.getByText('TemplateComponent')).toBeInTheDocument();
        expect(screen.getByText('ProductDetailPage')).toBeInTheDocument();
    });

    it('should redirect to default page when index route is matched', () => {
        render(<App />);
        expect(screen.getAllByTestId('navigate').some((el) => el.textContent?.includes('/1'))).toBe(true);
    });

    it('should redirect on unknown routes', () => {
        render(<App />);
        expect(screen.getAllByTestId('navigate').some((el) => el.textContent?.includes('/1'))).toBe(true);
    });
});
