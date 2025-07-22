/**
 * Abstract class for formatting values, specifically for currency in Colombian Pesos (COP).
 */
export abstract class FormatterUseCase {
    static formater = Intl.NumberFormat('es-CO', {
        currency: 'COP',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
        style: 'currency',
    });

    /**
     * Formats a number as currency in Colombian Pesos (COP).
     * @param value - The number to format.
     * @returns The formatted currency string.
     */
    static formatCurrency(value: number): string {
        return this.formater.format(value);
    }
}
