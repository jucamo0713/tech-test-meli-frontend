import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import clsx from 'clsx';

interface Props {
    images: string[];
    initialIndex: number;
    onClose: () => void;
}

/**
 * PhotoViewerComponent renders a full-screen image viewer with a carousel of images.
 * @param props - The properties for the component.
 * @param props.images - Array of image URLs to display in the viewer.
 * @param props.initialIndex - The index of the image to display initially.
 * @param props.onClose - Callback function to call when the viewer is closed.
 * @returns A JSX element representing the photo viewer component.
 */
export function PhotoViewerComponent({ images, initialIndex, onClose }: Props) {
    const [currentSlide, setCurrentSlide] = useState(initialIndex);

    const [sliderRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: initialIndex,
            loop: true,
            slideChanged: (slider) => {
                setCurrentSlide(slider.track.details.rel);
            },
        },
        [],
    );

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);
    const minManage = Math.max(0, currentSlide - 2);
    const maxManage = Math.min(images.length, currentSlide + 3);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center text-white">
            {/* Botón cerrar */}
            <button
                onClick={onClose}
                className="absolute top-5 left-5 text-white text-2xl p-2 hover:bg-white/20 rounded z-20"
            >
                <FaArrowLeftLong color="#ffffff" />
            </button>

            {/* Indicador slide actual */}
            <div className="absolute top-5 right-2 text-sm bg-white/10 px-3 py-1 rounded z-20">
                {currentSlide + 1} / {images.length}
            </div>
            <div className="absolute bottom-20 flex justify-center items-center gap-1 mt-2">
                {minManage > 0 && <button className={clsx('h-0.5 w-0.5 rounded-full transition-all', 'bg-gray-400')} />}
                {images.slice(minManage, maxManage).map((_, idx) => (
                    <button
                        key={idx}
                        className={clsx(
                            'rounded-full transition-all',
                            minManage + idx === currentSlide
                                ? 'bg-blue-500 w-2 h-2'
                                : Math.abs(minManage + idx - currentSlide) === 1
                                  ? 'bg-gray-400 w-1.5 h-1.5'
                                  : 'bg-gray-400 w-1 h-1',
                        )}
                    />
                ))}
                {maxManage < images.length && (
                    <button className={clsx('h-0.5 w-0.5 rounded-full transition-all', 'bg-gray-400')} />
                )}
            </div>

            {/* Carrusel */}
            <div ref={sliderRef} className="keen-slider w-full h-full">
                {images.map((img, i) => (
                    <div key={i} className="keen-slider__slide flex justify-center items-center">
                        <img
                            src={img}
                            alt={`Imagen ${i + 1}`}
                            className="max-h-[80vh] object-contain rounded-lg px-4"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
