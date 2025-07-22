import { MdStarHalf, MdStarOutline, MdStarRate } from 'react-icons/md';
import { useMemo } from 'react';

/**
 * StarsComponent renders a star rating component.
 * @param props - The properties for the component.
 * @param props.rating - The rating value (0 to 5).
 * @param props.size - The size of the stars (optional).
 * @returns A JSX element representing the star rating.
 */
export function StarsComponent({ rating, size }: { rating: number; size?: string }) {
    const [fillStars, halfStar, emptyStars] = useMemo(() => {
        let pendingStars = 5;
        const roundedRating = Math.round((rating ?? 0) * 2) / 2;
        const fill = Math.floor(roundedRating);
        pendingStars -= fill;
        const half = pendingStars > 0 && roundedRating - fill === 0.5 ? 1 : 0;
        pendingStars -= half;
        return [fill, half, pendingStars];
    }, [rating]);
    return (
        <>
            {Array.from({ length: Math.floor(fillStars) }, (_, index) => (
                <MdStarRate color="#3483FA" size={size} key={index} />
            ))}
            {halfStar > 0 && <MdStarHalf size={size} color="#3483FA" />}
            {Array.from({ length: emptyStars }, (_, index) => (
                <MdStarOutline key={index} size={size} color="#3483FA" />
            ))}
        </>
    );
}
