/**
 * Web Worker Manager
 * 
 * This utility helps create and manage web workers to offload heavy computations
 * from the main thread, improving UI responsiveness.
 */

// Type for worker message data
type WorkerMessageData = any;

// Type for worker message event
type WorkerMessageEvent = MessageEvent<WorkerMessageData>;

// Type for worker error event
type WorkerErrorEvent = ErrorEvent;

// Interface for worker options
interface WorkerOptions {
  onMessage?: (data: WorkerMessageData) => void;
  onError?: (error: ErrorEvent) => void;
}

/**
 * Creates a new web worker from a function
 * @param workerFunction - The function to run in the worker
 * @param options - Options for the worker
 * @returns The created worker instance
 */
export const createWorker = (
  workerFunction: Function,
  options?: WorkerOptions
): Worker => {
  // Convert the function to a string and create a blob URL
  const workerCode = `
    self.onmessage = function(event) {
      const result = (${workerFunction.toString()})(event.data);
      self.postMessage(result);
    }
  `;
  
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const workerUrl = URL.createObjectURL(blob);
  
  // Create the worker
  const worker = new Worker(workerUrl);
  
  // Set up event handlers
  if (options?.onMessage) {
    worker.onmessage = (event: WorkerMessageEvent) => {
      options.onMessage?.(event.data);
    };
  }
  
  if (options?.onError) {
    worker.onerror = (error: WorkerErrorEvent) => {
      options.onError?.(error);
    };
  }
  
  // Clean up the blob URL when the worker is terminated
  const originalTerminate = worker.terminate;
  worker.terminate = () => {
    URL.revokeObjectURL(workerUrl);
    originalTerminate.call(worker);
  };
  
  return worker;
};

/**
 * Creates a worker from an external script file
 * @param scriptUrl - URL of the worker script
 * @param options - Options for the worker
 * @returns The created worker instance
 */
export const createWorkerFromScript = (
  scriptUrl: string,
  options?: WorkerOptions
): Worker => {
  const worker = new Worker(scriptUrl);
  
  if (options?.onMessage) {
    worker.onmessage = (event: WorkerMessageEvent) => {
      options.onMessage?.(event.data);
    };
  }
  
  if (options?.onError) {
    worker.onerror = (error: WorkerErrorEvent) => {
      options.onError?.(error);
    };
  }
  
  return worker;
};

/**
 * Example worker function for particle animation calculations
 * This can be used to offload the particle animations in the Hero component
 */
export const particleAnimationWorker = (data: any) => {
  const { count, containerWidth, containerHeight } = data;
  
  // Generate particle data
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    const size = Math.random() * 50 + 10;
    const posX = Math.random() * containerWidth;
    const posY = containerHeight;
    const duration = Math.random() * 3 + 3;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.5 + 0.2;
    
    particles.push({
      id: i,
      size,
      posX,
      posY,
      duration,
      delay,
      opacity
    });
  }
  
  return particles;
};