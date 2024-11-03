export const simulateDelay = async (ms: number = 500) => {
    await new Promise((resolve) => setTimeout(resolve, ms)); // simulate waiting time for api call
  };