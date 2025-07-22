interface PaymentMethod {
    logo: string;
    name: string;
}

const paymentMethods: PaymentMethod[] = [
    { logo: '/payments/visa.svg', name: 'Visa' },
    { logo: '/payments/mastercard.svg', name: 'MasterCard' },
    { logo: '/payments/amex.svg', name: 'American Express' },
    { logo: '/payments/codensa.svg', name: 'Codensa' },
    { logo: '/payments/visa-debito.svg', name: 'Visa Débito' },
    { logo: '/payments/mastercard-debito.svg', name: 'MasterCard Débito' },
    { logo: '/payments/efecty.svg', name: 'Efecty' },
];

/**
 * Component that displays a list of payment methods.
 * @returns A React component rendering the payment methods.
 */
export function PaymentsMethodsListComponent() {
    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Medios de pago</h3>
            <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method, idx) => (
                    <div
                        key={idx}
                        className="border border-gray-200 rounded-md bg-white flex items-center justify-center p-0.5 w-12 shadow-sm"
                        title={method.name}
                    >
                        <img src={method.logo} alt={method.name} className="max-h-full max-w-full object-contain" />
                    </div>
                ))}
            </div>
        </div>
    );
}
