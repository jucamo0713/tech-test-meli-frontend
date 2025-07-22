import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import 'keen-slider/keen-slider.min.css';
import { IoHeartOutline, IoShareSocialOutline } from 'react-icons/io5';
import { useKeenSlider } from 'keen-slider/react';
import { PhotoViewerComponent } from '@products/infrastructure/ui/components/carousel/photo-viewer.component.tsx';

/**
 * CarouselComponent renders a carousel of images with autoplay functionality.
 * @param props - The properties for the component.
 * @param props.images - Array of image URLs to display in the carousel.
 * @returns A JSX element representing the carousel component.
 */
export function CarouselComponent({ images }: { images: string[] }) {
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        dragStarted: () => resetAutoplay(),
        loop: true,
        slideChanged: (slider) => {
            setCurrent(slider.track.details.rel);
            resetAutoplay();
        },
        slides: {
            perView: 1,
        },
    });
    useEffect(() => {
        if (images && images.length > 0) {
            instanceRef.current?.update();
        }
    }, [images, instanceRef]);
    const resetAutoplay = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            instanceRef.current?.next();
        }, 5000);
    }, [instanceRef]);
    const [minManage, maxManage, selectedImages] = useMemo(() => {
        const minManage = Math.max(0, current - 2);
        const maxManage = Math.min(images.length, current + 3);
        return [minManage, maxManage, images.slice(minManage, maxManage)];
    }, [current, images]);
    useEffect(() => {
        resetAutoplay();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [resetAutoplay]);

    const total = images.length;

    const [showPhotoViewer, setShowPhotoViewer] = useState(false);
    return (
        <div className="relative w-full max-w-md my-1 mx-auto overflow-hidden">
            <div ref={sliderRef} className="keen-slider">
                {images.map((src, idx) => (
                    <div key={idx} className="keen-slider__slide flex justify-center items-center">
                        <img
                            src={src}
                            onClick={() => setShowPhotoViewer(true)}
                            alt={`Slide ${idx + 1}`}
                            className="w-full object-contain"
                        />
                    </div>
                ))}
            </div>
            <div className="rounded-r-full rounded-l-full font-bold bg-white/90 absolute top-2 left-2 px-2 text-center">
                {current + 1} / {total}
            </div>

            <div className="rounded-full font-bold bg-white/90 absolute top-2 right-3 p-2 text-center">
                <IoHeartOutline color="#5A9AF9" size={20} />
            </div>

            <div className="rounded-full font-bold bg-white/90 absolute bottom-10 right-3 p-2 text-center">
                <IoShareSocialOutline color="#5A9AF9" size={20} />
            </div>

            <div className="flex justify-center items-center gap-1 mt-2">
                {minManage > 0 && (
                    <button
                        className={clsx('h-0.5 w-0.5 rounded-full transition-all', 'bg-gray-400')}
                        onClick={() => setCurrent(minManage - 1)}
                    />
                )}
                {selectedImages.map((_, idx) => (
                    <button
                        key={idx}
                        className={clsx(
                            'rounded-full transition-all',
                            minManage + idx === current
                                ? 'bg-blue-500 w-2 h-2'
                                : Math.abs(minManage + idx - current) === 1
                                  ? 'bg-gray-400 w-1.5 h-1.5'
                                  : 'bg-gray-400 w-1 h-1',
                        )}
                        onClick={() => setCurrent(idx)}
                    />
                ))}
                {maxManage < images.length && (
                    <button
                        className={clsx('h-0.5 w-0.5 rounded-full transition-all', 'bg-gray-400')}
                        onClick={() => setCurrent(maxManage + 1)}
                    />
                )}
            </div>
            {showPhotoViewer && (
                <PhotoViewerComponent
                    initialIndex={current}
                    onClose={() => setShowPhotoViewer(false)}
                    images={images}
                />
            )}
        </div>
    );
}
