import { IoLocationOutline, IoSearchOutline } from 'react-icons/io5';
import { BsCart2 } from 'react-icons/bs';
import { IoIosArrowForward, IoIosMenu } from 'react-icons/io';

/**
 * HeaderComponent is a functional component that renders the header section of the application.
 * @returns A JSX element containing the header with a logo, search bar, location input, and navigation links.
 */
export function HeaderComponent() {
    return (
        <header className="flex flex-col bg-[#FFF159] overflow-x-hidden px-0.5 md:px-10 lg:px-20 xl:px-32 divide-y-[0.2px] divide-gray-400 sm:divide-y-0">
            <div className="flex items-center gap-0 m-1 sm:gap-5 pb-2">
                <img src="/logo-meli.png" className="ml-[10px] h-[25px] flex-shrink-0 sm:hidden" alt="logo" />
                <img
                    src="/MELI-Logotype.webp"
                    className="ml-[10px] hidden h-[25px] flex-shrink-0 sm:inline-block"
                    alt="logo"
                />
                <div className="bg-white flex justify-evenly h-[28px] items-center shadow-sm grow-1 mx-2 p-1 sm:flex-row-reverse">
                    <div className="flex items-center justify-center w-[25px] h-[20px] shrink-1 sm:border-l-gray-300 sm:border-l-[1px] sm:pl-2">
                        <IoSearchOutline color="#BEBEBE" />
                    </div>
                    <input
                        type="text"
                        placeholder="Estoy buscando..."
                        className="text-gray-700 placeholder-[#BEBEBE] flex-1"
                    />
                </div>
                <div className="flex items-center justify-center gap-2 shrink-1 sm:hidden">
                    <button className="focus:outline-none shrink-1">
                        <IoIosMenu className="w-[25px] h-[25px]" />
                    </button>
                    <button className="focus:outline-none shrink-1">
                        <BsCart2 className="w-[25px] h-[25px]" />
                    </button>
                </div>
                <img src="/free-sent.webp" className="w-auto h-[34px] hidden shrink-1 sm:flex" alt="Envio gratis" />
            </div>
            <div className="flex gap-1 items-center justify-start color-[#736c28] sm:justify-between">
                <div className="flex items-center justify-start gap-1 pb-1 grow-1 sm:items-start sm:grow-0">
                    <IoLocationOutline color="#736c28" className="h-5 w-5" />
                    <div className="flex items-center justify-start sm:flex-col sm:items-start gap-1 sm:gap-0">
                        <span className="text-[#736c28] text-[13px] leading-[38px] sm:text-[10px] sm:leading-[10px]">
                            Ingresa tu
                        </span>
                        <span className="text-[#736c28] text-[13px] leading-[38px] sm:text-[13px] sm:leading-[15px] sm:text-black">
                            ubicación
                        </span>
                    </div>
                </div>
                <nav className="hidden items-center justify-center py-2 gap-3 sm:flex">
                    <div className="flex items-center gap-1">Categorías</div>
                    <div>Ofertas</div>
                    <div>Cupones</div>
                    <div>Vender</div>
                </nav>
                <div className="hidden sm:flex items-center justify-center gap-3">
                    <div>Crea tu cuenta</div>
                    <div>Ingresa</div>
                    <div>Mis compras</div>
                    <BsCart2 className="w-[20px] h-[20px]" />
                </div>
                <IoIosArrowForward color="#736c28" className="cursor-pointer sm:hidden" />
            </div>
        </header>
    );
}
