/**
 * FooterComponent is a functional component that renders the footer section of the application.
 * @returns A JSX element containing the footer with links to terms, privacy policy, and other information.
 */
export function FooterComponent() {
    return (
        <footer className="bg-white flex flex-col items-start gap-2 text-gray-600 text-sm py-4 w-full sm:px-10 border-t-gray-200 border-t box-border sm:items-center">
            <div className="px-10 gap-2 text-[#3484fa] flex items-center sm:hidden">
                <div className="pr-3  border-r-gray-200 border-r">Ingresa</div>
                <div>Crea tu cuenta</div>
            </div>
            <div className="px-10 my-5 flex flex-col gap-2 box-border w-full sm:px-20 md:px-25 lg:px-50 xl:px-70">
                <div className="flex flex-wrap justify-start gap-x-2 text-[10px] text-black sm:text[14px] sm:justify-between sm:gap-x-0">
                    <span> Términos y condiciones</span>
                    <span>Promociones</span>
                    <span>Cómo cuidamos tu privacidad</span>
                    <span>Accesibilidad</span>
                    <span>Ayuda / PQR</span>
                    <span>
                        <a target="_blank" href="www.sic.gov.co">
                            www.sic.gov.co
                        </a>
                    </span>
                </div>
                <div className="text-[#999] text-[10px]">© 1999-2025 MercadoLibre Colombia LTDA.</div>
                <div className="text-[#999] text-[10px]">Calle 100 #7-33, Torre I, Piso 16, Bogotá D.C., Colombia</div>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-evenly gap-4 py-3 px-10 border-t-gray-200 border-t sm:mx-20 box-border sm:w-auto">
                <a
                    className="nav-footer-sic-logo"
                    href="https://www.sic.gov.co/"
                    target="_blank"
                    rel="nofollow noreferrer"
                >
                    <img
                        width="141"
                        height="30"
                        decoding="async"
                        src="https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/5.21.22/mercadolibre/sic.png"
                        alt="SIC - Industria y comercio"
                    />
                </a>
                <a>
                    <img width="200" height="34" src="/stopAndCompare.png" alt="pare y compare" />
                </a>
                <a target="_blank" href="www.sic.gov.co" className="text-[11px] text-[#333] mt-2 sm:hidden">
                    www.sic.gov.co
                </a>
            </div>
        </footer>
    );
}
