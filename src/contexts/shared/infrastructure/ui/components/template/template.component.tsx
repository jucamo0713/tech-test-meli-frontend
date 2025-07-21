import { HeaderComponent } from '@shared/infrastructure/ui/components/header/header.component.tsx';
import { FooterComponent } from '@shared/infrastructure/ui/components/footer/footer.component.tsx';
import { Outlet } from 'react-router';

/**
 * TemplateComponent is a simple React component that serves as a template layout.
 * @returns A JSX element containing a header, main content, and footer.
 */
export function TemplateComponent() {
    return (
        <>
            <HeaderComponent />
            <Outlet />
            <FooterComponent />
        </>
    );
}
