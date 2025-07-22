import type { Characteristic, CharacteristicNested } from '@products/domain/model/characteristic.ts';

/**
 * Component to display product characteristics.
 * @param props - The properties for the component.
 * @param props.groups - Array of characteristic groups, each containing a label and an array of characteristics.
 * @param props.rootChars - Array of root characteristics, each with a label and value.
 * @returns A JSX element representing the characteristics section.
 */
export function CharacteristicsComponent({
    groups,
    rootChars,
}: {
    groups: CharacteristicNested[];
    rootChars: Characteristic[];
}) {
    return (
        <>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Características generales</h3>
            <div className="border border-gray-200 rounded-md overflow-hidden">
                {rootChars.map((item, index) => (
                    <div
                        key={index}
                        className={`flex justify-between items-center px-4 py-3 text-sm ${
                            index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                        }`}
                    >
                        <span className="font-semibold text-gray-700">{item.label}</span>
                        <span className="text-gray-900 text-right">{item.value}</span>
                    </div>
                ))}
            </div>
            {groups.length > 0 && (
                <div className="mt-6">
                    {groups.map((group, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">{group.label}</h3>
                            {group.value.map((char, charIndex) => (
                                <div
                                    key={charIndex}
                                    className={`flex justify-between items-center px-4 py-3 text-sm ${
                                        charIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                                    }`}
                                >
                                    <span className="font-semibold text-gray-700">{char.label}</span>
                                    <span className="text-gray-900 text-right">{char.value}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
