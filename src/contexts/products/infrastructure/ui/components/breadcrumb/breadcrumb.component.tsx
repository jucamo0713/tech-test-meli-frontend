import { FiChevronRight } from 'react-icons/fi';

interface ProductBreadcrumbProps {
    navigation: string[];
}

/**
 * BreadcrumbComponent renders a breadcrumb navigation for product pages.
 * @param props - The properties for the component.
 * @param props.navigation - An array of strings representing the breadcrumb navigation items.
 * @returns A JSX element representing the breadcrumb navigation.
 */
export function BreadcrumbComponent({ navigation }: ProductBreadcrumbProps) {
    return (
        <div className="w-full text-xs text-blue-600 flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-1 flex-wrap">
                <a href="#" className="hover:underline">
                    Volver
                </a>
                <span className="text-gray-400 mx-1">|</span>
                {navigation.map((item, index) => (
                    <div key={index} className="flex items-center gap-1">
                        {index > 0 && <FiChevronRight className="text-gray-400 text-[10px]" />}
                        <a href="#" className="hover:underline">
                            {item}
                        </a>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 text-blue-600 text-xs whitespace-nowrap">
                <a href="#" className="hover:underline">
                    Vender uno igual
                </a>
                <span className="text-gray-400">|</span>
                <a href="#" className="hover:underline">
                    Compartir
                </a>
            </div>
        </div>
    );
}
