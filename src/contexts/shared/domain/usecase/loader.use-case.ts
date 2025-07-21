import { BehaviorSubject, Observable } from 'rxjs';
import { v4 } from 'uuid';

/**
 * Abstract class that manages a global loading state through a set of loader processes.
 * This is used to display or hide a global loader based on active processes.
 */
export abstract class LoaderUseCase {
    /**
     * BehaviorSubject that controls the global loader's visibility state.
     */
    private static $GlobalLoaderSubject = new BehaviorSubject(false);

    /**
     * Set that holds the active loader process identifiers.
     */
    private static loadProcess = new Set<string>();

    /**
     * Adds a new loader process and returns its identifier.
     * If no loader processes are active, it triggers the global loader to be visible.
     * @returns The unique identifier of the loader process.
     */
    public static addLoaderProcess() {
        const process = v4();
        const sendEvent = this.loadProcess.size == 0;
        this.loadProcess.add(process);
        if (sendEvent) {
            this.$GlobalLoaderSubject.next(true);
        }
        return process;
    }

    /**
     * Removes a loader process based on the provided identifier.
     * If no processes remain, it hides the global loader.
     * @param process - The identifier of the loader process to remove.
     * @returns The same identifier of the removed loader process.
     */
    public static removeLoaderProcess(process: string) {
        this.loadProcess.delete(process);

        if (this.loadProcess.size == 0) {
            this.$GlobalLoaderSubject.next(false);
        }
        return process;
    }

    static get $GlobalLoaderObserver(): Observable<boolean> {
        return this.$GlobalLoaderSubject.asObservable();
    }
}
