export const loadPuterScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src="https://js.puter.com/v2/"]')) {
        resolve(); // Script is already loaded
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Puter.js script'));
      document.body.appendChild(script);
    });
  };
  